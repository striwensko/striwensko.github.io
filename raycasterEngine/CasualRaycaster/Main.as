package
{
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.geom.Point;
	import flash.geom.Rectangle;
	import flash.text.TextField;
	import flash.utils.getTimer;
	import flash.display.StageScaleMode;
	import flash.display.StageQuality;
	import flash.utils.Timer;
	import flash.events.TimerEvent;
	
	[SWF( backgroundColor='0x222222', frameRate='120', width='480', height='320')]
	
	public class Main extends Sprite
	{
		private const w: int = 320;
		private const h: int = 208;
		
		private const bounds: Rectangle = new Rectangle( 0, 0, w, h );;
		private const origin: Point = new Point();
		
		private var engine: Raycaster;
		private var buffer: BitmapData;
		
		private var bmp: Bitmap;
		
		private var mouseDown: Boolean;
		
		public function Main()
		{
			stage.scaleMode = StageScaleMode.NO_SCALE;
			stage.quality = StageQuality.LOW;
			stage.frameRate = 33.333;
			
			var timer: Timer = new Timer( 20 );
			timer.addEventListener( TimerEvent.TIMER, enterFrame );
			timer.start();
			
			engine = new Raycaster( w, h );
			buffer = new BitmapData( w, h );
			
			bmp = new Bitmap( buffer );
			
			bmp.x = ( stage.stageWidth - bmp.width ) / 2;
			bmp.y = ( stage.stageHeight - bmp.height ) / 2;
			
			addChild( bmp );
			
			engine.render();
			
			stage.addEventListener( MouseEvent.MOUSE_DOWN, onMouseDown );
			stage.addEventListener( MouseEvent.MOUSE_UP, onMouseUp );
			stage.addEventListener( Event.ENTER_FRAME, enterFrame );
		}
		
		private function onMouseDown( event: Event ): void
		{
			mouseDown = true;
		}
		
		private function onMouseUp( event: Event ): void
		{
			mouseDown = false;
		}
		
		private function enterFrame( event: Event ): void
		{
			engine.angle += ( mouseX - stage.stageWidth / 2 ) / 4000;
			
			engine.roll += ( mouseY - stage.stageHeight / 2 ) / 32;
			engine.roll = engine.roll > 80 ? 80 : engine.roll < -80 ? -80 : engine.roll;
			
			if( mouseDown )
			{
				engine.x += Math.cos( engine.angle ) * 6;
				engine.y += Math.sin( engine.angle ) * 6;
				
				engine.z -= engine.roll / 50;
				engine.z = engine.z > 60 ? 60 : engine.z < 4 ? 4 : engine.z;
			}
			
			engine.z += ( 32 - engine.z ) / 128;

			engine.render();
			
			buffer.copyPixels( engine, bounds, origin );
		}
	}
}
