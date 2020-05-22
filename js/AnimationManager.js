
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
    await UIReveal();
}

function StartNutsAnim(){
    NutsAnim.start(false, 1, 0.5, 6.25)
    
}

function TurnShadowsOn(){
    
    generator.darkness = 0
}


var revealUI = gsap.timeline({pause: true})

function UIReveal(){
    revealUI.to("img", {css:{width: "100%"}, delay: 2, ease: "back.out(1.7)", stagger: 0.1, duration: 0.5})
    revealUI.to(HsPLaneList[0].scaling, {x:1, y:1, z:1, ease: "back.out(1.7)", duration: 0.5},"<1")
    
}