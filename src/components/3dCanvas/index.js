import React, { useState, useEffect } from "react";
import testVrm from "../../VrmModels/test.vrm";
import "./style.css";

const ThreedCanvas = (props) => {
  //test functions

  const [currentVrm, setCurrentVrm] = useState();
  const [isVrmLoaded, setIsVrmLoaded] = useState(0);

  useEffect(() => {
    //Import Helper Functions from Kalidokit
    const remap = window.Kalidokit.Utils.remap;
    const clamp = window.Kalidokit.Utils.clamp;
    const lerp = window.Kalidokit.Vector.lerp;

    /* THREEJS WORLD SETUP */

    // // renderer
    const renderer = new window.THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    // document.body.appendChild(renderer.domElement);

    // camera
    const orbitCamera = new window.THREE.PerspectiveCamera(
      35,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    orbitCamera.position.set(0.0, 1.4, 0.7);

    // controls
    const orbitControls = new window.THREE.OrbitControls(
      orbitCamera,
      renderer.domElement
    );
    orbitControls.screenSpacePanning = true;
    orbitControls.target.set(0.0, 1.4, 0.0);
    orbitControls.update();

    // scene
    const scene = new window.THREE.Scene();

    // light
    const light = new window.THREE.DirectionalLight(0xffffff);
    light.position.set(1.0, 1.0, 1.0).normalize();
    scene.add(light);

    // Main Render Loop
    const clock = new window.THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);

      if (currentVrm) {
        // Update model to render physics
        currentVrm.update(clock.getDelta());
      }
      renderer.render(scene, orbitCamera);
    }
    animate();

    /* VRM CHARACTER   aa */

    // Import Character VRM
    const loader = new window.THREE.GLTFLoader();
    loader.crossOrigin = "anonymous";

    // Import model from URL, add your own model here
    // loader.load(
    //   testVrm,

    //   (gltf) => {
    //     window.THREE.VRMUtils.removeUnnecessaryJoints(gltf.scene);

    //     window.THREE.VRM.from(gltf).then((vrm) => {
    //       scene.add(vrm.scene);
    //       currentVrm = vrm;
    //       currentVrm.scene.rotation.y = Math.PI; // Rotate model 180deg to face camera
    //     });
    //   },

    //   (progress) => {
    //     setIsVrmLoaded(100.0 * (progress.loaded / progress.total));
    //     if (100.0 * (progress.loaded / progress.total) == 100) {
    //       // document.getElementById("render3d").appendChild(renderer.domElement);
    //     }
    //   },
    //   (error) => console.error(error)
    // );

    // Animate Rotation Helper function
    const rigRotation = (
      name,
      rotation = { x: 0, y: 0, z: 0 },
      dampener = 1,
      lerpAmount = 0.3
    ) => {
      if (!currentVrm) {
        return;
      }
      const Part = currentVrm.humanoid.getBoneNode(
        window.THREE.VRMSchema.HumanoidBoneName[name]
      );
      if (!Part) {
        return;
      }

      let euler = new window.THREE.Euler(
        rotation.x * dampener,
        rotation.y * dampener,
        rotation.z * dampener
      );
      let quaternion = new window.THREE.Quaternion().setFromEuler(euler);
      Part.quaternion.slerp(quaternion, lerpAmount); // interpolate
    };

    let oldLookTarget = new window.THREE.Euler();
    const rigFace = (riggedFace) => {
      if (!currentVrm) {
        return;
      }
      rigRotation("Neck", riggedFace.head, 0.7);

      // Blendshapes and Preset Name Schema
      const Blendshape = currentVrm.blendShapeProxy;
      const PresetName = window.THREE.VRMSchema.BlendShapePresetName;

      // Simple example without winking. Interpolate based on old blendshape, then stabilize blink with `Kalidokit` helper function.
      // for VRM, 1 is closed, 0 is open.
      riggedFace.eye.l = lerp(
        clamp(1 - riggedFace.eye.l, 0, 1),
        Blendshape.getValue(PresetName.Blink),
        0.5
      );
      riggedFace.eye.r = lerp(
        clamp(1 - riggedFace.eye.r, 0, 1),
        Blendshape.getValue(PresetName.Blink),
        0.5
      );
      riggedFace.eye = window.Kalidokit.Face.stabilizeBlink(
        riggedFace.eye,
        riggedFace.head.y
      );
      Blendshape.setValue(PresetName.Blink, riggedFace.eye.l);

      // Interpolate and set mouth blendshapes
      Blendshape.setValue(
        PresetName.I,
        lerp(riggedFace.mouth.shape.I, Blendshape.getValue(PresetName.I), 0.5)
      );
      Blendshape.setValue(
        PresetName.A,
        lerp(riggedFace.mouth.shape.A, Blendshape.getValue(PresetName.A), 0.5)
      );
      Blendshape.setValue(
        PresetName.E,
        lerp(riggedFace.mouth.shape.E, Blendshape.getValue(PresetName.E), 0.5)
      );
      Blendshape.setValue(
        PresetName.O,
        lerp(riggedFace.mouth.shape.O, Blendshape.getValue(PresetName.O), 0.5)
      );
      Blendshape.setValue(
        PresetName.U,
        lerp(riggedFace.mouth.shape.U, Blendshape.getValue(PresetName.U), 0.5)
      );

      //PUPILS
      //interpolate pupil and keep a copy of the value
      let lookTarget = new window.THREE.Euler(
        lerp(oldLookTarget.x, riggedFace.pupil.y, 0.4),
        lerp(oldLookTarget.y, riggedFace.pupil.x, 0.4),
        0,
        "XYZ"
      );
      oldLookTarget.copy(lookTarget);
      currentVrm.lookAt.applyer.lookAt(lookTarget);
    };
  }, []);

  //test functions ends

  return (
    <>
      <div className="threedrender" id="render3d"></div>
    </>
  );
};

export default ThreedCanvas;
