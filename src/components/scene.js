import { useEffect, useState } from "react";

function WrapperScene({ children, assets, forceVR }) {
  const [assetReady, setAssetReady] = useState(false);

  useEffect(() => {
    setAssetReady(true);
    document.getElementById("myEnterVRButton");
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        height: "100%",
        width: "100%",
      }}
    >
      <a-scene
        auto-enter-vr
        loading-screen="enabled: false"
        vr-mode-ui={forceVR ? "enterVRButton: #myEnterVRButton; enterARButton: #myEnterARButton" : "enterARButton: #myEnterARButton"}
        // stats
      >
        <button
          id="myEnterARButton"
          style={{display: 'none'}}
        >
        </button>
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
        {assetReady && children}
      </a-scene>
    </div>
  );
}

export default WrapperScene;
