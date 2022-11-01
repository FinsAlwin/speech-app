import React, { useState, useEffect, useContext } from "react";
import "./style.css";
import LocalStream from "../VideoStreams/LocalStream";
import { Spinner } from "react-bootstrap";
import ThreedCanvas from "../3dCanvas";

// import modelUrl from "../../models/hiyori/hiyori_pro_t10.model3";
import { useSelector, useDispatch } from "react-redux";
import { testItem } from "../../redux/Cordinates/action";
import io from "socket.io-client";
const socket = io("http://localhost:4000");

const User3dCall = (props) => {
  const [isCallActive, setIsCallActive] = useState(true);
  const [currentVrm, setCurrentVrm] = useState();
  const [isVrmLoaded, setIsVrmLoaded] = useState(0);
  const [point, setPoint] = useState(false);
  const [element, setElement] = useState();

  useEffect(() => {
    // socket.on("connection", (socket) => {
    //   console.log("a user connected");
    //   socket.on("test", test);
    //   socket.on("disconnect", () => {
    //     console.log("user disconnected");
    //   });
    // });
  }, []);

  const {
    Application,
    live2d: { Live2DModel },
  } = window.PIXI;

  const {
    Face,
    Vector: { lerp },
    Utils: { clamp },
  } = window.Kalidokit;

  // Url to Live2D
  const modelUrl = "../../models/hiyori/hiyori_pro_t10.model3.json";

  let currentModel, facemesh;

  (async function main() {
    // create pixi application
    const app = new window.PIXI.Application({
      view: document.getElementById("live2d"),
      autoStart: true,
      backgroundAlpha: 0,
      backgroundColor: 0xffffff,
      resizeTo: window,
    });

    // load live2d model
    currentModel = await Live2DModel.from(modelUrl, { autoInteract: false });
    currentModel.scale.set(0.2);
    currentModel.interactive = true;
    currentModel.anchor.set(0.5, 0.5);
    currentModel.position.set(
      window.innerWidth * 0.5,
      window.innerHeight * 0.8
    );

    // Add events to drag model
    currentModel.on("pointerdown", (e) => {
      currentModel.offsetX = e.data.global.x - currentModel.position.x;
      currentModel.offsetY = e.data.global.y - currentModel.position.y;
      currentModel.dragging = true;
    });
    currentModel.on("pointerup", (e) => {
      currentModel.dragging = false;
    });
    currentModel.on("pointermove", (e) => {
      if (currentModel.dragging) {
        currentModel.position.set(
          e.data.global.x - currentModel.offsetX,
          e.data.global.y - currentModel.offsetY
        );
      }
    });

    // Add mousewheel events to scale model
    document.querySelector("#live2d").addEventListener("wheel", (e) => {
      e.preventDefault();
      currentModel.scale.set(
        clamp(currentModel.scale.x + e.deltaY * -0.001, -0.5, 10)
      );
    });

    // add live2d model to stage
    app.stage.addChild(currentModel);
  })();

  const animateLive2DModel = async (points) => {
    if (!points) return;

    if (points) {
      rigFace(points, 0.5);
    }
  };

  // update live2d model internal state
  const rigFace = (result) => {
    const lerpAmount = 0.5;
    const coreModel = currentModel.internalModel.coreModel;

    currentModel.internalModel.motionManager.update = (...args) => {
      // disable default blink animation
      currentModel.internalModel.eyeBlink = undefined;

      coreModel.setParameterValueById(
        "ParamEyeBallX",
        lerp(
          result.pupil.x,
          coreModel.getParameterValueById("ParamEyeBallX"),
          lerpAmount
        )
      );
      coreModel.setParameterValueById(
        "ParamEyeBallY",
        lerp(
          result.pupil.y,
          coreModel.getParameterValueById("ParamEyeBallY"),
          lerpAmount
        )
      );

      // X and Y axis rotations are swapped for Live2D parameters
      // because it is a 2D system and KalidoKit is a 3D system
      coreModel.setParameterValueById(
        "ParamAngleX",
        lerp(
          result.head.degrees.y,
          coreModel.getParameterValueById("ParamAngleX"),
          lerpAmount
        )
      );
      coreModel.setParameterValueById(
        "ParamAngleY",
        lerp(
          result.head.degrees.x,
          coreModel.getParameterValueById("ParamAngleY"),
          lerpAmount
        )
      );
      coreModel.setParameterValueById(
        "ParamAngleZ",
        lerp(
          result.head.degrees.z,
          coreModel.getParameterValueById("ParamAngleZ"),
          lerpAmount
        )
      );

      // update body params for models without head/body param sync
      const dampener = 0.3;
      coreModel.setParameterValueById(
        "ParamBodyAngleX",
        lerp(
          result.head.degrees.y * dampener,
          coreModel.getParameterValueById("ParamBodyAngleX"),
          lerpAmount
        )
      );
      coreModel.setParameterValueById(
        "ParamBodyAngleY",
        lerp(
          result.head.degrees.x * dampener,
          coreModel.getParameterValueById("ParamBodyAngleY"),
          lerpAmount
        )
      );
      coreModel.setParameterValueById(
        "ParamBodyAngleZ",
        lerp(
          result.head.degrees.z * dampener,
          coreModel.getParameterValueById("ParamBodyAngleZ"),
          lerpAmount
        )
      );

      // Simple example without winking.
      // Interpolate based on old blendshape, then stabilize blink with `Kalidokit` helper function.
      let stabilizedEyes = window.Kalidokit.Face.stabilizeBlink(
        {
          l: lerp(
            result.eye.l,
            coreModel.getParameterValueById("ParamEyeLOpen"),
            0.7
          ),
          r: lerp(
            result.eye.r,
            coreModel.getParameterValueById("ParamEyeROpen"),
            0.7
          ),
        },
        result.head.y
      );
      // eye blink
      coreModel.setParameterValueById("ParamEyeLOpen", stabilizedEyes.l);
      coreModel.setParameterValueById("ParamEyeROpen", stabilizedEyes.r);

      // mouth
      coreModel.setParameterValueById(
        "ParamMouthOpenY",
        lerp(
          result.mouth.y,
          coreModel.getParameterValueById("ParamMouthOpenY"),
          0.3
        )
      );
      // Adding 0.3 to ParamMouthForm to make default more of a "smile"
      coreModel.setParameterValueById(
        "ParamMouthForm",
        0.3 +
          lerp(
            result.mouth.x,
            coreModel.getParameterValueById("ParamMouthForm"),
            0.3
          )
      );
    };

    rigFace(result);
  };

  const handlePoints = async (e) => {
    await setPoint(true);
    socket.on("pointTrans", rigFace);
  };

  //test ends

  return (
    <>
      <div className="threedContainer shadow-lg">
        <LocalStream width={200} height={100} points={handlePoints} />
        {!point && (
          <div className="spinnerContainer">
            <Spinner animation="border" variant="primary" />
          </div>
        )}

        {point && <canvas className="threedrenderCanvas" id="live2d"></canvas>}
      </div>
    </>
  );
};

export default User3dCall;
