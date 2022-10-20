import "phaser"
import SceneManager from "../engines/SceneManager"
import { InputManager } from "../engines/command"
import { mainGameConfigManager, player, saveGame } from "../global"

export default class Standard extends Phaser.Scene {
	private inputManager = new InputManager()
	private readonly sceneManager: SceneManager 

	constructor() {
		super('Garden')
		this.sceneManager = new SceneManager(this)
	}

	preload() {
		this.sceneManager.loadSceneAssets()
		this.sceneManager.loadPlayerAssets()
	}

	create() {
		this.inputManager.buildInput(this)
		this.setCamera()
		this.sceneManager.buildPlayerAnims()
		this.sceneManager.buildScene()
		player.setSprite(this, {x:96, y:410, width: 24, height:32, scale: 1})
		this.cameras.main.startFollow(player.getSprite(), true, 0.05, 0.05)
		saveGame({lvl: mainGameConfigManager.config.lvls[0]})
	}

	update() {
		this.inputManager.inputHandler()
	}

	private setCamera() {
		this.cameras.main.setBounds(0, 0, 1920 * 2, 1080 * 2)
		this.matter.world.setBounds(0, 0, 1920 * 2, 1080 * 2)
		this.cameras.main.zoom = 1.5
	}
}
