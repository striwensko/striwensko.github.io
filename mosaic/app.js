var fs = require('fs');
var http = require('http');

var request = require('request');

var jpeg = require('jpeg-js');
var PNG = require('pngjs').PNG;
var PNGReader = require('./node_modules/pngReader/PNGReader.js');


/*
*	ONLY CHANGE THIS, THE FILE CONTAINS ALL THE SETTINGS FOR THE MOSAIC
*/
var SETTINGS_PATH = 'mosaics/' + (process.argv[2] || 'kipmoore') + '/settings.json';







var settings = JSON.parse(fs.readFileSync(SETTINGS_PATH, 'utf8'));

var SEARCH = settings.twitter.search || 'kipmoore';
var oauth = {};
oauth.oauth_access_token = settings.twitter.oauth_access_token || '25337478-iStkZqMcdkIkyHf3sXg7lA4rNAuIitHRvNKcgjViQ';
oauth.oauth_access_token_secret = settings.twitter.oauth_access_token_secret || '3uGPT0U5rExFOboaFZB5oJK23J3IzeS8jIgZGbX0';
oauth.consumer_key = settings.twitter.consumer_key || '1THhIhnetP2fUeeepRrrg';
oauth.consumer_secret = settings.twitter.consumer_secret || 'rsNsNPK6f1lZ9CDh5mXIouD3n8DFwUBYXRDTUUFkQ';


// COLS AND ROWS OF THE AVATAR IMAGE
var COLS = settings.avatars.width || 20;
var ROWS = settings.avatars.height || 20;
var GRID = settings.cell || 8;
var COVER_URL = settings.cover || 'images/cover.png';
var OUTPUT_URL = settings.output || 'images/out.jpg';
var WATER_MARK = settings.watermark;

var SAMPLE_GRIDS;
var MOSAIC_DATA = [];


var IMAGE_POOL = new Array(8 * 8 * 8);
for (var iBucket = 0; iBucket < IMAGE_POOL.length; iBucket++)
{
	IMAGE_POOL[iBucket] = new Array();
}
var SIZE = COLS * ROWS;

var url = 'https://api.twitter.com/1.1/search/tweets.json';
var items = [];
var tweets = [];
var users = {};
var bitmapData = new Buffer(48 * 48 * SIZE * 4);
var smallVersion;



calcSampleGrid();
loadTwitter();

function calcSampleGrid()
{
	if (GRID == 32)
	{
		SAMPLE_GRIDS = new Array(8);
		SAMPLE_GRIDS[0] = {x:1 * 4, y:1 * 4};
		SAMPLE_GRIDS[1] = {x:5 * 4, y:1 * 4};
		SAMPLE_GRIDS[2] = {x:1 * 4, y:5 * 4};
		SAMPLE_GRIDS[3] = {x:5 * 4, y:5 * 4};
		SAMPLE_GRIDS[4] = {x:3 * 4, y:3 * 4};
		SAMPLE_GRIDS[5] = {x:7 * 4, y:3 * 4};
		SAMPLE_GRIDS[6] = {x:3 * 4, y:7 * 4};
		SAMPLE_GRIDS[7] = {x:7 * 4, y:7 * 4};
	}
	else if (GRID == 24)
	{
		SAMPLE_GRIDS = new Array(8);
		SAMPLE_GRIDS[0] = {x:1 * 3, y:1 * 3};
		SAMPLE_GRIDS[1] = {x:5 * 3, y:1 * 3};
		SAMPLE_GRIDS[2] = {x:1 * 3, y:5 * 3};
		SAMPLE_GRIDS[3] = {x:5 * 3, y:5 * 3};
		SAMPLE_GRIDS[4] = {x:3 * 3, y:3 * 3};
		SAMPLE_GRIDS[5] = {x:7 * 3, y:3 * 3};
		SAMPLE_GRIDS[6] = {x:3 * 3, y:7 * 3};
		SAMPLE_GRIDS[7] = {x:7 * 3, y:7 * 3};
	}
	else if (GRID == 20)
	{
		SAMPLE_GRIDS = new Array(8);
		SAMPLE_GRIDS[0] = {x:0 * 5, y:0 * 5};
		SAMPLE_GRIDS[1] = {x:2 * 5, y:0 * 5};
		SAMPLE_GRIDS[2] = {x:1 * 5, y:1 * 5};
		SAMPLE_GRIDS[3] = {x:3 * 5, y:1 * 5};
		SAMPLE_GRIDS[4] = {x:0 * 5, y:2 * 5};
		SAMPLE_GRIDS[5] = {x:2 * 5, y:2 * 5};
		SAMPLE_GRIDS[6] = {x:1 * 5, y:3 * 5};
		SAMPLE_GRIDS[7] = {x:3 * 5, y:3 * 5};
	}
	else if (GRID == 16)
	{
		SAMPLE_GRIDS = new Array(8);
		SAMPLE_GRIDS[0] = {x:1 * 2, y:1 * 2};
		SAMPLE_GRIDS[1] = {x:5 * 2, y:1 * 2};
		SAMPLE_GRIDS[2] = {x:1 * 2, y:5 * 2};
		SAMPLE_GRIDS[3] = {x:5 * 2, y:5 * 2};
		SAMPLE_GRIDS[4] = {x:3 * 2, y:3 * 2};
		SAMPLE_GRIDS[5] = {x:7 * 2, y:3 * 2};
		SAMPLE_GRIDS[6] = {x:3 * 2, y:7 * 2};
		SAMPLE_GRIDS[7] = {x:7 * 2, y:7 * 2};
	}
	else if (GRID == 8)
	{
		SAMPLE_GRIDS = new Array(8);
		SAMPLE_GRIDS[0] = {x:1, y:1};
		SAMPLE_GRIDS[1] = {x:5, y:1};
		SAMPLE_GRIDS[2] = {x:1, y:5};
		SAMPLE_GRIDS[3] = {x:5, y:5};
		SAMPLE_GRIDS[4] = {x:3, y:3};
		SAMPLE_GRIDS[5] = {x:7, y:3};
		SAMPLE_GRIDS[6] = {x:3, y:7};
		SAMPLE_GRIDS[7] = {x:7, y:7};
	}
	else if (GRID == 6)
	{
		SAMPLE_GRIDS = new Array(9);
		SAMPLE_GRIDS[0] = {x:1, y:1};
		SAMPLE_GRIDS[1] = {x:3, y:1};
		SAMPLE_GRIDS[2] = {x:5, y:1};
		SAMPLE_GRIDS[3] = {x:1, y:3};
		SAMPLE_GRIDS[4] = {x:3, y:3};
		SAMPLE_GRIDS[5] = {x:5, y:3};
		SAMPLE_GRIDS[6] = {x:1, y:5};
		SAMPLE_GRIDS[7] = {x:3, y:5};
		SAMPLE_GRIDS[8] = {x:5, y:5};
	}
	else if (GRID == 4)
	{
		SAMPLE_GRIDS = new Array(8);
		SAMPLE_GRIDS[0] = {x:0, y:0};
		SAMPLE_GRIDS[1] = {x:2, y:0};
		SAMPLE_GRIDS[2] = {x:1, y:1};
		SAMPLE_GRIDS[3] = {x:3, y:1};
		SAMPLE_GRIDS[4] = {x:0, y:2};
		SAMPLE_GRIDS[5] = {x:2, y:2};
		SAMPLE_GRIDS[6] = {x:1, y:3};
		SAMPLE_GRIDS[7] = {x:3, y:3};
	}

}
/*
Client ID 	0229499584614c06b2d96aecb65658b1
Client Secret 	23786c6bfe6b4bb2ac58c483197a8143
Website URL 	http://priority.widgetmatic.com
Redirect URI 	http://priority.widgetmatic.com
Support Email 	juancarlos.arias@gmail.com
*/
var req = 0;
function loadTwitter(id)
{
	req++;
	if (req > 20)
	{
		return false;
	}
	var data = {url:url, oauth:oauth, qs:{q:SEARCH, count:100}, method:'GET'};
	if (id)
	{
		data.qs.max_id = id;
	}
	
	//console.log(JSON.stringify(data));
	request(data, function (e, r, body) {
		//console.log(body);
		var data = JSON.parse(body);
		var statuses = data.statuses;
		var text = '';
		console.log('length:' + statuses.length)
		for (var iItem = 0; iItem < statuses.length; iItem++)
		{
			//console.log(items[iItem].user.profile_image_url);
			//console.log(items[iItem].text);
			//text += items[iItem].text + '\n';
			text += statuses[iItem].user.profile_image_url + '\r\n';
			//console.log(items[iItem].id_str)
			
			if (!users["user:" + statuses[iItem].user.id] && (items.length < SIZE))
			{
				users["user:" + statuses[iItem].user.id] = true;
				items.push({image:statuses[iItem].user.profile_image_url, text:statuses[iItem].text, id:statuses[iItem].id_str, userId:statuses[iItem].user.id, username:statuses[iItem].user.screen_name});
				
				
			}
		}
		var lastId = items[items.length - 1].id;
		console.log('lastID', lastId, items.length);
		if (items.length < SIZE)
		{
			loadTwitter(lastId);
		}
		else
		{
			nextImage();
		}
		//fs.writeFile('message.txt', items[items.length - 2].id + "--" + lastId+ "--" + body);
	});
}

function nextImage()
{
	
	if (items.length == 0)
	{
		console.log("TOTAL", tweets.length);
		saveAvatars();
	}
	else
	{
		var data = items.shift();
		console.log(items.length, data.image.split(/\//).pop())
		loadImage(data.image, data.text, data.id, data.username);
	}
	/*for (var iImages = 0; iImages < items.length; iImages++)
	{
		loadImage(items[iImages].image, items[iImages].text, items[iImages].id);
	}
	console.log("totalTweets:", totalTweets)*/
}
function loadImage(url, text, id, username)
{
	//url = 'http://abs.twimg.com/sticky/default_profile_images/default_profile_3_normal.png';
	var domain = url.match(/^.*?\..*?(?=\/)/)[0];
	var path = url.replace(/^.*?\..*?(?=\/)/, '');
	var filename = url.split(/\//).pop();
	var extension = url.split(/\./).pop().toLowerCase();

	//console.log(extension)
	if (extension != 'jpeg' && extension != 'jpg' && extension != 'png')
	{
		nextImage();
		return false;
	}
	
	var options = {
		host: domain.replace(/^.*?\/\//, ''),
		port: 80,
		path: path
	}

	var file = http.get(options, function(res){
		var imagedata = '';
		res.setEncoding('binary')
		res.on('data', function(chunk){
			imagedata += chunk;

		});
		res.on('end', function(){
			if (extension == 'png')
			{
				decodePNG(imagedata, text, username);
				//console.log(url);
			}
			else if (extension == 'jpeg' || extension == 'jpg')
			{
				decodeJPEG(imagedata, text, username);
			}
			//console.log(filename);
			nextImage();
		});
		
		
	});
}
function decodePNG(imagedata, text, username)
{
	try
	{
		var reader = new PNGReader(imagedata);
		reader.parse(function(err, png){
			if (err) throw err;
			
			var x = (tweets.length % COLS) * 48;
			var y = Math.floor(tweets.length / COLS) * 48;
			if (png.width * png.height * 3 == png.pixels.length)
			{
				for (var iPixel = 0; iPixel < png.pixels.length; iPixel+= 3)
				{
					var srcX = (iPixel / 3) % 48;
					var srcY = Math.floor((iPixel / 3) / 48);

					var index = ((x + srcX) + (y + srcY) * 48 * COLS) * 4;
					bitmapData[index]     = png.pixels[iPixel];
					bitmapData[index + 1] = png.pixels[iPixel + 1];
					bitmapData[index + 2] = png.pixels[iPixel + 2];
					bitmapData[index + 3] = 255;	
				}
				tweets.push({text:text, username:username});
			}
			else if (png.width * png.height * 4 == png.pixels.length)
			{
				for (var iPixel = 0; iPixel < png.pixels.length; iPixel+= 4)
				{
					var srcX = (iPixel / 4) % 48;
					var srcY = Math.floor((iPixel / 4) / 48);

					var index = ((x + srcX) + (y + srcY) * 48 * COLS) * 4;
					bitmapData[index]     = png.pixels[iPixel];
					bitmapData[index + 1] = png.pixels[iPixel + 1];
					bitmapData[index + 2] = png.pixels[iPixel + 2];
					bitmapData[index + 3] = png.pixels[iPixel + 3];	
				}
				tweets.push({text:text, username:username});
			}
		})

	}
	catch (e)
	{
		console.log("ERROR CATCH", e);
	}
	
}
function decodeJPEG(imagedata, text, username)
{
	try
	{

		var bytes = new Buffer(imagedata.length);
		for (var i = 0, l = imagedata.length; i < l; i++){
			bytes[i] = imagedata[i].charCodeAt(0);
		}

		var rawImageData = jpeg.decode(bytes);

		var x = (tweets.length % COLS) * 48;
		var y = Math.floor(tweets.length / COLS) * 48;
		for (var iPixel = 0; iPixel < rawImageData.data.length; iPixel+= 4)
		{
			var srcX = (iPixel / 4) % 48;
			var srcY = Math.floor((iPixel / 4) / 48);
			var index = ((x + srcX) + (y + srcY) * 48 * COLS) * 4;

			bitmapData[index]     = rawImageData.data[iPixel];
			bitmapData[index + 1] = rawImageData.data[iPixel + 1];
			bitmapData[index + 2] = rawImageData.data[iPixel + 2];
			bitmapData[index + 3] = rawImageData.data[iPixel + 3];
		}

		tweets.push({text:text, username:username});
	}
	catch (e)
	{
		console.log("ERROR CATCH", e);
	}
}
function saveAvatars()
{
	var rawImageData = {
		data: bitmapData,
		width: 48 * COLS,
		height: 48 * Math.ceil(SIZE / COLS)
	};
	var jpegImageData = jpeg.encode(rawImageData, 50);
	fs.writeFile(settings.avatarImage, jpegImageData.data);
	
	
	
	var ZOOM_OUT = 48 / GRID;
	var SAMPLES = ZOOM_OUT * ZOOM_OUT;
	smallVersion = new Buffer(GRID * GRID * 4 * SIZE);
	for (var iPixel = 0; iPixel < smallVersion.length; iPixel+= 4)
	{
		var destX = ((iPixel / 4) % (GRID * COLS)) * ZOOM_OUT;
		var destY = (Math.floor((iPixel / 4) / (GRID * COLS))) * ZOOM_OUT;
		var r = 0;
		var g = 0;
		var b = 0;
		var alpha = 0;
		for (var iSample = 0; iSample < SAMPLES; iSample++)
		{
			var x = destX + (iSample % ZOOM_OUT);
			var y = destY + Math.floor(iSample / ZOOM_OUT);
			var index = (x + y * 48 * COLS) * 4;
			r += bitmapData[index];
			g += bitmapData[index + 1];
			b += bitmapData[index + 2];
			alpha += bitmapData[index + 3];
		}
		var index = (destX + destY * 48 * COLS) * 4;
		
		smallVersion[iPixel    ] = (r / SAMPLES) | 0;
		smallVersion[iPixel + 1] = (g / SAMPLES) | 0;
		smallVersion[iPixel + 2] = (b / SAMPLES) | 0;
		smallVersion[iPixel + 3] = (alpha / SAMPLES) | 0;
	}
	
	
	
	classifyImage();
	loadCover();
}

function classifyImage()
{
	var cols = COLS;
	var rows = ROWS;
	var totalCells = tweets.length;
	var width = COLS * GRID;
	
	var index;
	var iPixel = 0;
	var colors = new Array(SAMPLE_GRIDS.length);
	for (var iCell = 0; iCell < totalCells; iCell++)
	{
		var startX = (iCell % cols) * GRID;
		var startY = Math.floor(iCell / cols) * GRID;
		
		for (iPixel = 0; iPixel < SAMPLE_GRIDS.length; iPixel++)
		{
			tmpX = startX + SAMPLE_GRIDS[iPixel].x;
			tmpY = startY + SAMPLE_GRIDS[iPixel].y;
			
			index = (tmpX + tmpY * width) * 4;

			colors [iPixel] = {red:smallVersion[index], green:smallVersion[index + 1], blue:smallVersion[index + 2]};
		}
		
		var minPixel = 0;
		var minDiff = 0xFFFFFF;
		for (iPixel = 0; iPixel < colors.length; iPixel++)
		{
			//color = 
			colors[iPixel].diff = 0;
			for (var cPixel = 0; cPixel < SAMPLE_GRIDS.length; cPixel++)
			{
				colors[iPixel].diff += Math.abs(colors[iPixel].red - colors[cPixel].red);
				colors[iPixel].diff += Math.abs(colors[iPixel].green - colors[cPixel].green);
				colors[iPixel].diff += Math.abs(colors[iPixel].blue - colors[cPixel].blue);
			}
			//trace(colors[iPixel].diff);
			if (colors[iPixel].diff < minDiff)
			{
				minPixel = iPixel
				minDiff = colors[iPixel].diff;
			}
		}
		
		var red = (colors[minPixel].red & 0xE0) >> 5;
		var green = (colors[minPixel].green & 0xE0) >> 5;
		var blue = (colors[minPixel].blue & 0xE0) >> 5;
		var poolID = (red << 6) + (green << 3) + (blue);
		
		var item = {x:startX, y:startY, index:iCell};
		IMAGE_POOL[poolID].push(item);
		
		if (blue < 7)
		{
			poolID = (red << 6) + (green << 3) + (blue + 1);
			IMAGE_POOL[poolID].push(item);
		}
		if (blue > 0)
		{
			poolID = (red << 6) + (green << 3) + (blue - 1);
			IMAGE_POOL[poolID].push(item);
		}


		if (green < 7)
		{
			poolID = (red << 6) + ((green + 1) << 3) + (blue);
			IMAGE_POOL[poolID].push(item);
		}
		if (green > 0)
		{
			poolID = (red << 6) + ((green - 1) << 3) + (blue);
			IMAGE_POOL[poolID].push(item);
		}



		if (red < 7)
		{
			poolID = ((red + 1) << 6) + (green << 3) + (blue);
			IMAGE_POOL[poolID].push(item);
		}
		if (red > 0)
		{
			poolID = ((red - 1) << 6) + (green << 3) + (blue);
			IMAGE_POOL[poolID].push(item);
		}
	}
}
function loadCover()
{	
	fs.createReadStream(COVER_URL)
    .pipe(new PNG({
        filterType: 4
    }))
    .on('parsed', function() {
	
		var cover = this;
        pixelate(this);
 
		if (WATER_MARK)
		{
			fs.createReadStream(WATER_MARK)
			.pipe(new PNG({
				filterType: 4
			}))
			.on('parsed', function() {
				console.log("ADD WATERMARK");
				
				
				
				for (var iPixel = 0; iPixel < cover.data.length; iPixel+= 4)
				{
					var opacity = this.data[iPixel + 3];
					if (opacity != 0)
					{
						//console.log(cover.data[iPixel]);
					cover.data[iPixel] = ((this.data[iPixel] * opacity + cover.data[iPixel] * (255 - opacity)) / 255) | 0;
					cover.data[iPixel + 1] = ((this.data[iPixel + 1] * opacity + cover.data[iPixel + 1] * (255 - opacity)) / 255) | 0;
					cover.data[iPixel + 2] = ((this.data[iPixel + 2] * opacity + cover.data[iPixel + 2] * (255 - opacity)) / 255) | 0;
						//console.log(cover.data[iPixel], this.data[iPixel], opacity)
					}
				}
				
				saveMosaic(cover);
			});
		}
		else
		{
			saveMosaic(cover);
		}
		
        //this.pack().pipe(fs.createWriteStream('images/out.png'));
		
    });
	/**/
}
function saveMosaic(cover)
{
	var bitmapData = new Buffer(cover.data.length);
	for (var iPixel = 0; iPixel < cover.data.length; iPixel++)
	{
		bitmapData[iPixel] = cover.data[iPixel];
	}

	var rawImageData = {
		data: bitmapData,
		width: cover.width,
		height: cover.height
	};

	var jpegImageData = jpeg.encode(rawImageData, 90);
	fs.writeFile(OUTPUT_URL, jpegImageData.data);
}
function pixelate(image)
{
	var cols = Math.ceil(image.width / GRID);
	var rows = Math.ceil(image.height / GRID);
	
	var totalCells = cols * rows;
	var pool;
	
	
	MOSAIC_DATA = new Array(totalCells);
	
	var image_width = COLS * GRID;
	for (var iCell = 0; iCell < totalCells; iCell++)
	{
		var startX = (iCell % cols) * GRID;
		var startY = Math.floor(iCell / cols) * GRID;
		var cellWidth = Math.min(image.width - startX, GRID);
		var cellHeight = Math.min(image.height - startY, GRID);
		
		var index = (startX + image.width * startY) * 4;
		var red = image.data[index];
		var green = image.data[index + 1];
		var blue = image.data[index + 2];
		var r, g, b;
		//console.log(index, cellHeight, cellWidth, red, green, blue);
		for (var x = 0; x < cellWidth; x++)
		{
			for (var y = 0; y < cellHeight; y++)
			{
				var index = (startX + x + image.width * (startY + y)) * 4;
				image.data[index] = red;
				image.data[index + 1] = green;
				image.data[index + 2] = blue;
			}
		}
		
		r = (red & 0xE0) >> 5;
		g = (green & 0xE0) >> 5;
		b = (blue & 0xE0) >> 5;
		
		
		var filled = false;
		if (false && !filled)
		{
			pool = getLevel1Explore(r, g, b);
			if (pool.length > 6)
			{
				var item = pool[Math.floor(pool.length * Math.random())];
				var srcX = item.x;
				var srcY = item.y;
				var ratio = 0.5;
				var multiplier = 1 - ratio;
				//console.log(pool.length, cellWidth, cellHeight, iCell)
				
				for (var x = 0; x < cellWidth; x++)
				{
					for (var y = 0; y < cellHeight; y++)
					{
						var index = (startX + x + image.width * (startY + y)) * 4;
						var tweetIndex = (srcX + x + image_width * (srcY + y)) * 4;

						image.data[index    ] = (smallVersion[tweetIndex]     * multiplier) + red   * ratio;
						image.data[index + 1] = (smallVersion[tweetIndex + 1] * multiplier) + green * ratio;
						image.data[index + 2] = (smallVersion[tweetIndex + 2] * multiplier) + blue  * ratio;
					}
				}
				//filled = addToMosaic(pool, iCol, iRow, color, 0.5);
			}
		}
		if (false && !filled)
		{
			pool = getLevel2Explore(r, g, b);
			if (pool.length > 6)
			{
				var item = pool[Math.floor(pool.length * Math.random())];
				var srcX = item.x;
				var srcY = item.y;
				var ratio = 0.6;
				var multiplier = 1 - ratio;
				//console.log(pool.length, cellWidth, cellHeight, iCell)
				
				for (var x = 0; x < cellWidth; x++)
				{
					for (var y = 0; y < cellHeight; y++)
					{
						var index = (startX + x + image.width * (startY + y)) * 4;
						var tweetIndex = (srcX + x + image_width * (srcY + y)) * 4;

						image.data[index    ] = (smallVersion[tweetIndex]     * multiplier) + red   * ratio;
						image.data[index + 1] = (smallVersion[tweetIndex + 1] * multiplier) + green * ratio;
						image.data[index + 2] = (smallVersion[tweetIndex + 2] * multiplier) + blue  * ratio;
					}
				}
				//filled = addToMosaic(pool, iCol, iRow, color, 0.5);
			}
		}
		

		if (!filled)
		{
			pool = getLevel3Explore(r, g, b);
			if (pool.length > 6)
			{
				var item = pool[Math.floor(pool.length * Math.random())];
				var srcX = item.x;
				var srcY = item.y;
				var ratio = 0.7;
				var multiplier = 1 - ratio;
				
				MOSAIC_DATA[iCell] = {r:r, g:g, b:b, index:item.index};
				//console.log(pool.length, cellWidth, cellHeight, iCell)
				
				for (var x = 0; x < cellWidth; x++)
				{
					for (var y = 0; y < cellHeight; y++)
					{
						var index = (startX + x + image.width * (startY + y)) * 4;
						var tweetIndex = (srcX + x + image_width * (srcY + y)) * 4;

						image.data[index    ] = (smallVersion[tweetIndex]     * multiplier) + red   * ratio;
						image.data[index + 1] = (smallVersion[tweetIndex + 1] * multiplier) + green * ratio;
						image.data[index + 2] = (smallVersion[tweetIndex + 2] * multiplier) + blue  * ratio;
					}
				}
				filled = true;
				//filled = addToMosaic(pool, iCol, iRow, color, 0.5);
			}
		}
		
		if (!filled)
		{
			MOSAIC_DATA[iCell] = {r:r, g:g, b:b, index:false};
		}
	}
	
	
	var data = {};
	data.avatars = {cols:COLS, rows:ROWS, image:settings.avatarImage}
	data.image = {cols:cols, rows:rows, image:OUTPUT_URL};
	data.json = settings.outputJSON;
	data.cellSize = GRID;
	
	data.tweets = tweets;
	data.mosaic = MOSAIC_DATA;
	
	fs.writeFile(settings.outputJSON, JSON.stringify(data));
}


function getLevel1Explore(red, green, blue)
{
	var pool = new Array();

	pool = pool.concat(IMAGE_POOL[((red) << 6) + ((green) << 3) + (blue)]);

	if ((red > 0))
	{
		pool = pool.concat(IMAGE_POOL[((red - 1) << 6) + ((green) << 3) + (blue)]);
	}
	if ((green > 0))
	{
		pool = pool.concat(IMAGE_POOL[(red << 6) + ((green - 1) << 3) + (blue)]);
	}
	if ((blue > 0))
	{
		pool = pool.concat(IMAGE_POOL[((red) << 6) + ((green) << 3) + (blue - 1)]);
	}

	if ((red < 7))
	{
		pool = pool.concat(IMAGE_POOL[((red + 1) << 6) + ((green) << 3) + (blue)]);
	}
	if ((green < 7))
	{
		pool = pool.concat(IMAGE_POOL[(red << 6) + ((green + 1) << 3) + (blue)]);
	}
	if ((blue < 7))
	{
		pool = pool.concat(IMAGE_POOL[((red) << 6) + ((green) << 3) + (blue + 1)]);
	}

	return pool;
}

function getLevel3Explore(red, green, blue)
{
	var pool = new Array();

	if ((red < 7) && (green < 7) && (blue < 7))
	{
		pool = pool.concat(IMAGE_POOL[((red + 1) << 6) + ((green + 1) << 3) + (blue + 1)]);
	}
	if ((red > 0) && (green > 0) && (blue > 0))
	{
		pool = pool.concat(IMAGE_POOL[((red - 1) << 6) + ((green - 1) << 3) + (blue - 1)]);
	}


	if ((red < 6) && (green < 7))
	{
		pool = pool.concat(IMAGE_POOL[((red + 2) << 6) + ((green + 1) << 3) + (blue)]);
	}
	if ((green < 6) && (blue < 7))
	{
		pool = pool.concat(IMAGE_POOL[((red) << 6) + ((green + 2) << 3) + (blue + 1)]);
	}
	if ((blue < 6) && (red < 7))
	{
		pool = pool.concat(IMAGE_POOL[((red + 1) << 6) + ((green) << 3) + (blue + 2)]);
	}

	if ((red < 7) && (green < 6))
	{
		pool = pool.concat(IMAGE_POOL[((red + 1) << 6) + ((green + 2) << 3) + (blue)]);
	}
	if ((green < 7) && (blue < 6))
	{
		pool = pool.concat(IMAGE_POOL[((red) << 6) + ((green + 1) << 3) + (blue + 2)]);
	}
	if ((blue < 7) && (red < 6))
	{
		pool = pool.concat(IMAGE_POOL[((red + 2) << 6) + ((green) << 3) + (blue + 1)]);
	}



	if ((red > 1) && (green > 0))
	{
		pool = pool.concat(IMAGE_POOL[((red - 2) << 6) + ((green - 1) << 3) + (blue)]);
	}
	if ((green > 1) && (blue > 0))
	{
		pool = pool.concat(IMAGE_POOL[((red) << 6) + ((green - 2) << 3) + (blue - 1)]);
	}
	if ((blue > 1) && (red > 0))
	{
		pool = pool.concat(IMAGE_POOL[((red - 1) << 6) + ((green) << 3) + (blue - 2)]);
	}

	if ((red > 0) && (green > 1))
	{
		pool = pool.concat(IMAGE_POOL[((red - 1) << 6) + ((green - 2) << 3) + (blue)]);
	}
	if ((green > 0) && (blue > 1))
	{
		pool = pool.concat(IMAGE_POOL[((red) << 6) + ((green - 1) << 3) + (blue - 2)]);
	}
	if ((blue > 0) && (red > 1))
	{
		pool = pool.concat(IMAGE_POOL[((red - 2) << 6) + ((green) << 3) + (blue - 1)]);
	}



	if ((red < 6) && (green > 0))
	{
		pool = pool.concat(IMAGE_POOL[((red + 2) << 6) + ((green - 1) << 3) + (blue)]);
	}
	if ((green < 6) && (blue > 0))
	{
		pool = pool.concat(IMAGE_POOL[((red) << 6) + ((green + 2) << 3) + (blue - 1)]);
	}
	if ((blue < 6) && (red > 0))
	{
		pool = pool.concat(IMAGE_POOL[((red - 1) << 6) + ((green) << 3) + (blue + 2)]);
	}

	if ((red > 0) && (green < 6))
	{
		pool = pool.concat(IMAGE_POOL[((red - 1) << 6) + ((green + 2) << 3) + (blue)]);
	}
	if ((green > 0) && (blue < 6))
	{
		pool = pool.concat(IMAGE_POOL[((red) << 6) + ((green - 1) << 3) + (blue + 2)]);
	}
	if ((blue > 0) && (red < 6))
	{
		pool = pool.concat(IMAGE_POOL[((red + 2) << 6) + ((green) << 3) + (blue - 1)]);
	}




	if ((red > 1) && (green < 7))
	{
		pool = pool.concat(IMAGE_POOL[((red - 2) << 6) + ((green + 1) << 3) + (blue)]);
	}
	if ((green > 1) && (blue < 7))
	{
		pool = pool.concat(IMAGE_POOL[((red) << 6) + ((green - 2) << 3) + (blue + 1)]);
	}
	if ((blue > 1) && (red < 7))
	{
		pool = pool.concat(IMAGE_POOL[((red + 1) << 6) + ((green) << 3) + (blue - 2)]);
	}

	if ((red < 7) && (green > 1))
	{
		pool = pool.concat(IMAGE_POOL[((red + 1) << 6) + ((green - 2) << 3) + (blue)]);
	}
	if ((green < 7) && (blue > 1))
	{
		pool = pool.concat(IMAGE_POOL[((red) << 6) + ((green + 1) << 3) + (blue - 2)]);
	}
	if ((blue < 7) && (red > 1))
	{
		pool = pool.concat(IMAGE_POOL[((red - 2) << 6) + ((green) << 3) + (blue + 1)]);
	}



	return pool;
}

function getLevel2Explore(red, green, blue)
{
	var pool = new Array();

	if ((red < 7) && (green < 7))
	{
		pool = pool.concat(IMAGE_POOL[((red + 1) << 6) + ((green + 1) << 3) + (blue)]);
	}
	if ((red < 7) && (blue < 7))
	{
		pool = pool.concat(IMAGE_POOL[((red + 1) << 6) + ((green) << 3) + (blue + 1)]);
	}
	if ((blue < 7) && (green < 7))
	{
		pool = pool.concat(IMAGE_POOL[((red) << 6) + ((green + 1) << 3) + (blue + 1)]);
	}

	if ((red > 0) && (green > 0))
	{
		pool = pool.concat(IMAGE_POOL[((red - 1) << 6) + ((green - 1) << 3) + (blue)]);
	}
	if ((red > 0) && (blue > 0))
	{
		pool = pool.concat(IMAGE_POOL[((red - 1) << 6) + ((green) << 3) + (blue - 1)]);
	}
	if ((blue > 0) && (green > 0))
	{
		pool = pool.concat(IMAGE_POOL[((red) << 6) + ((green - 1) << 3) + (blue - 1)]);
	}

	if ((red > 0) && (green < 7))
	{
		pool = pool.concat(IMAGE_POOL[((red - 1) << 6) + ((green + 1) << 3) + (blue)]);
	}
	if ((red > 0) && (blue < 7))
	{
		pool = pool.concat(IMAGE_POOL[((red - 1) << 6) + ((green) << 3) + (blue + 1)]);
	}
	if ((blue > 0) && (green < 7))
	{
		pool = pool.concat(IMAGE_POOL[((red) << 6) + ((green + 1) << 3) + (blue - 1)]);
	}

	if ((red < 7) && (green > 0))
	{
		pool = pool.concat(IMAGE_POOL[((red + 1) << 6) + ((green - 1) << 3) + (blue)]);
	}
	if ((red < 7) && (blue > 0))
	{
		pool = pool.concat(IMAGE_POOL[((red + 1) << 6) + ((green) << 3) + (blue - 1)]);
	}
	if ((blue < 7) && (green > 0))
	{
		pool = pool.concat(IMAGE_POOL[((red) << 6) + ((green - 1) << 3) + (blue + 1)]);
	}


	if ((red > 1))
	{
		pool = pool.concat(IMAGE_POOL[((red - 2) << 6) + ((green) << 3) + (blue)]);
	}
	if ((green > 1))
	{
		pool = pool.concat(IMAGE_POOL[(red << 6) + ((green - 2) << 3) + (blue)]);
	}
	if ((blue > 1))
	{
		pool = pool.concat(IMAGE_POOL[((red) << 6) + ((green) << 3) + (blue - 2)]);
	}


	if ((red < 6))
	{
		pool = pool.concat(IMAGE_POOL[((red + 2) << 6) + ((green) << 3) + (blue)]);
	}
	if ((green < 6))
	{
		pool = pool.concat(IMAGE_POOL[(red << 6) + ((green + 2) << 3) + (blue)]);
	}
	if ((blue < 6))
	{
		pool = pool.concat(IMAGE_POOL[((red) << 6) + ((green) << 3) + (blue + 2)]);
	}

	return pool;
}