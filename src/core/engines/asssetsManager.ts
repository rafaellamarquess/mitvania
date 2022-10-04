import { BodyType } from "matter"
import { GameObjects, Physics, Scene, Tilemaps } from "phaser"
import { windowSize } from "../config"

export interface AssetManager {
	(scene: Scene): void
}

export const buildPlayerAnims: AssetManager = (scene: Scene) => {
	scene.anims.create({
		key: 'player-idle',
		frameRate: 5,
		repeat: -1,
		frames: scene.anims.generateFrameNumbers('player', { start: 0, end: 3 })
	})

	scene.anims.create({
		key: 'moving',
		frameRate: 10,
		frames: scene.anims.generateFrameNumbers('player', { start: 4, end: 7 })
	})
}

export const backgroundManager = (scene: Scene): void => {
	const bg = scene.add.image(0, 0, 'background')
	bg.setDisplayOrigin(0, 0)
	bg.setDisplaySize(windowSize.width, windowSize.height)
	bg.setScrollFactor(0.25)
}

export const loadSceneAssets = (scene: Scene) => {
	scene.load.image('background', 'backgrounds/Background_0.png')
	scene.load.image('tiles', 'tiles/Tiles.png')
	scene.load.tilemapTiledJSON('map', 'tiles/teste.json')
}

export const loadPlayerAssets = (scene: Scene) => {
	scene.load.spritesheet('attack', 'sprites/attack.png', { frameWidth: 74, frameHeight: 74 })
	scene.load.spritesheet('player', 'sprites/dino-sprite.png', { frameWidth: 48, frameHeight: 48 })
}

export const makeLayerSolid = (scene: Scene, layer: Tilemaps.TilemapLayer) => {
	layer.setCollisionByExclusion([-1])
	scene.matter.world.convertTilemapLayer(layer)
}

export const buildScene = (scene: Scene): Tilemaps.TilemapLayer  => {
	const Bodies = scene.matter.bodies 
	const map = scene.make.tilemap({ key: 'map' })
	const tileset = map.addTilesetImage('teste', 'tiles')
	let mainLayer!: Tilemaps.TilemapLayer;
	const objLayer = map.getObjectLayer('objetos')
	const pols = objLayer.objects[2]
		//const object = map.createFromObjects('objetos', {id: 11})

	//object[0].body = meuDeus 
	
	//console.log(object)
	console.log(objLayer)

	objLayer.objects.forEach((obj: Phaser.Types.Tilemaps.TiledObject) => {
		if (obj.name ==='plataforma') {
			// const plataforma = new GameObjects.Polygon(scene, obj.x!, obj.y!, obj.polygon!).setOrigin(0,0)
			// const img = scene.matter.add.imag(obj.x!, obj.y!, '', 0, {
			// 	vertices: obj.polygon!,
			// 	isStatic: true,
			// })
		const put =scene.matter.add.polygon(pols.x!,pols.y!, pols.polygon!.length,0, {
				vertices: pols.polygon!,
				isStatic: true,
			})
			put.
	
		}
	})

	map.getTileLayerNames().forEach((tileLayerName: string) => {
		const layer = map.createLayer(tileLayerName, tileset, 0, 0)
		if (tileLayerName === 'main-layer') {
			mainLayer = layer
		}
	})
	return mainLayer
}