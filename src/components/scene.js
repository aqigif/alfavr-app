import { useEffect, useState } from "react";

function WrapperScene({
  children,
  assets,
  forceVR,
  noVr,
  onEnterVR,
  onExitVR,
  onClickScene,
}) {
  const [assetReady, setAssetReady] = useState(false);
  const AFRAME = window?.AFRAME;

  useEffect(() => {
    setAssetReady(true);
    document.querySelector("a-scene").addEventListener("enter-vr", function () {
      console.log("ENTERED VR");
      if (AFRAME.utils.device.isMobile()) {
        onEnterVR();
      }
    });
    document.querySelector("a-scene").addEventListener("exit-vr", function () {
      console.log("EXIT VR");
      onExitVR();
    });
    if (AFRAME) {
      try {
        AFRAME.registerComponent("global-vr-interaction", {
          init: function () {
            let controlsEl = document.querySelector("[button-controls]");
            controlsEl.addEventListener("buttondown", function (evt) {});
            controlsEl.addEventListener("buttonup", function (evt) {
              onClickScene();
            });
          },
        });
      } catch (error) {}
    }
  }, [AFRAME]);

  const assetReadyRender = () => {
    if (assetReady) {
      return <>{children}</>;
    }
  };
  return (
    <div
      style={{
        position: "absolute",
        height: "100%",
        width: "100%",
      }}
    >
      <a-scene
        global-vr-interaction
        start-click
        vr-mode-ui={
          noVr
            ? "enabled: false;"
            : forceVR
            ? "enterVRButton: #myEnterVRButton; enterARButton: #myEnterARButton"
            : "enterARButton: #myEnterARButton"
        }
        // stats
      >
        <button id="myEnterARButton" style={{ display: "none" }}></button>
        {forceVR && (
          <div className="a-enter-vr custom-vr" aframe-injected="">
            <div className="icon" />
            <button
              id="myEnterVRButton"
              className="a-enter-vr-button custom-vr-button"
              title="Enter VR mode with a headset or fullscreen mode on a desktop. Visit https://webvr.rocks or https://webvr.info for more information."
              aframe-injected=""
            >
              Enter VR World
            </button>
          </div>
        )}
        {assets}
        {assetReadyRender()}
      </a-scene>
    </div>
  );
}

export default WrapperScene;
