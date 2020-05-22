class Hotspot {
    constructor(name, pos, mat, papa){

    //mesh
    this.Mesh = new BABYLON.MeshBuilder.CreatePlane("hs " + name, { size: 0.35 }, scene);
    this.Mesh.position = pos;

    //parent
    this.Mesh.setParent(papa)

    //color
    this.Mesh.material = mat;

    //collider
    this.hsColl = new BABYLON.MeshBuilder.CreateBox("HS Collider" + name, { height: 0.4, width:0.4, depth: 0.1 }, scene)

    this.hsColl.material = colMat;
    this.hsColl.setParent(this.Mesh);
    this.hsColl.position = new BABYLON.Vector3(0,0,0);
    this.hsColl.isPickable = true;
    this.Mesh.scaling = new BABYLON.Vector3(0,0,0)
    this.Mesh.rotation.y = -79 +  Math.PI/2
    AllowMouseOverMesh(this.hsColl)

    }
}

function AllowMouseOverMesh(mesh){
    mesh.actionManager = new BABYLON.ActionManager(scene);
	
	//ON MOUSE ENTER
	mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function(ev){	
        //mesh.material.emissiveColor = BABYLON.Color3.Blue();
       //overStation = mesh.name.split('Arrow Collider ')[1];
        //overStation = "arrow border " + overStation
        //console.log("mouse over " +  overStation)
        //scene.getMeshByName(overStation).material = arrowMatOn
	}));
	
	//ON MOUSE EXIT
	mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, function(ev){
        //mesh.material.emissiveColor = BABYLON.Color3.Black();
        //scene.getMeshByName(overStation).material = arrowMatOff
        //overStation = undefined;
	}));
}
