
var RevealAnim = gsap.timeline({ paused: true });


function BufferStartAnim() {
    RevealAnim.to(camera, { radius: 4, duration: 4, ease: "power4.out" }); //1 second before end of last timeline
    RevealAnim.from(camera, { beta: 50 * (Math.PI / 180), duration: 1, ease: "power2.out" }, "<"); //1 second before end of last timeline
    RevealAnim.to(Jar_P.rotation, { y: 0, ease: "back.out(1)", duration: 1 }, "<");
    RevealAnim.to(Jar_P.scaling, { x: 1, y: 1, z: 1, ease: "back.out(1)", duration: 1 }, "<");
}

function StartExpAnimation(){
    window.setTimeout(()=>{
        RevealAnim.restart()
    },1000)
    window.setTimeout(PlayNuts, 2000)
}

var PlayNuts = async function () {
    NutsMaterial.alpha = 1
    await StartNutsAnim();
    await TurnShadowsOn();
}

function StartNutsAnim(){
    NutsAnim.start(false, 1, 0.5, 6.25)
    
}

function TurnShadowsOn(){
    
    generator.darkness = 0
}
//PARTICLES
var emitterSelection, selectParticles
function CreateParticlesHolder(){
    emitterSelection = BABYLON.Mesh.CreateBox("emitterSelection", 0.1, scene);
    emitterSelection.isVisible = false
    emitterSelection.position.y = 1.3
    
}
function createWinParticles(selec, pos) {
    emitterSelection.position.x = pos.x
    emitterSelection.position.z = pos.z

    selectParticles = new BABYLON.ParticleSystem("rain", 10, scene);
    selectParticles.particleTexture = PartTexts[selec]
        
    // Particles
    selectParticles.minAngularSpeed = -2;
    selectParticles.maxAngularSpeed = 2;
    selectParticles.minSize = 0.3;
    selectParticles.maxSize = 0.6;
    selectParticles.minLifeTime = 0.5;
    selectParticles.maxLifeTime = 1;
    selectParticles.minEmitPower = 1;
    selectParticles.maxEmitPower = 2;
    selectParticles.emitter = emitterSelection;
    selectParticles.emitRate = 6;
    selectParticles.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD;
    selectParticles.direction1 = new BABYLON.Vector3(-0.5, 0.8, -0.6);
    selectParticles.direction2 = new BABYLON.Vector3(0.5, 0.6, 0.6);
    selectParticles.colorDead = new BABYLON.Color4(1, 1, 1, 0.5)
    selectParticles.gravity = new BABYLON.Vector3(0, -1, 0);
    //selectParticles.disposeOnStop = true
    selectParticles.start()

}
