import React, { useState } from "react";
import WrapperScene from "../../components/scene";

const Assets = () => {
  return (
    <a-assets>
      <a-asset-item id="store" src="/assets/alfamart-6.glb"></a-asset-item>
    </a-assets>
  );
};

function Store() {
  const AFRAME = window?.AFRAME;
  const [click, setClick] = useState({
    show: false,
    fuse: "",
    isVr: false,
    cameraPosition: "",
  });
  const [cameraPosition, setCameraPosition] = useState("0 1.5 0");

  React.useEffect(() => {
    if (AFRAME) {
      handleCashier();
    }
  }, [AFRAME]);
  console.log(click);
  const handleCashier = () => {
    try {
      if (AFRAME) {
        AFRAME.registerComponent("cursor-listener", {
          init: function () {
            this.el.addEventListener("mouseleave", function (evt) {
              setClick((prev) => {
                if (!prev?.isVr) {
                  return prev;
                }
                return {
                  ...prev,
                  trigger: "mouseleave",
                  fuse: "",
                };
              });
            });
            this.el.addEventListener("click", function (evt) {
              // console.log("I was fusing at: ", evt.detail.intersection.point);
              setClick((prev) => {
                if (!prev?.isVr) {
                  handleMove("-2 1.5 -2.3");
                  return {
                    ...prev,
                    trigger: "click",
                    cameraPosition: "-2 1.5 -2.3",
                    show: prev.cameraPosition === "-2 1.5 -2.3",
                    fuse: "cashier",
                  };
                }
                return prev;
              });
            });
            this.el.addEventListener("fusing", function (evt) {
              // console.log("I was fusing at: ", evt.detail.intersection.point);
              setClick((prev) => {
                if (!prev?.isVr) {
                  return prev;
                }
                return {
                  ...prev,
                  trigger: "fusing",
                  fuse: "cashier",
                };
              });
            });
          },
        });
      }
    } catch (error) {}
  };
  const handleMove = (to, from) => {
    setCameraPosition(to);
    const cameraRig = document.getElementById("camera");
    cameraRig.setAttribute(
      "animation",
      `property: position; from: ${from || cameraPosition}; to: ${to}; dur: 700`
    );
  };
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  // console.log(click);
  return (
    <>
      <WrapperScene
        assets={<Assets />}
        noVr={params?.["plain"] !== undefined}
        forceVR={params?.["vr-mode"] !== undefined}
        onEnterVR={() => {
          setCameraPosition("0 0 0");
          setClick((prev) => {
            return {
              ...prev,
              isVr: true,
            };
          });
        }}
        onExitVR={() => {
          setCameraPosition("0 1.5 0");
          setClick((prev) => {
            return {
              ...prev,
              isVr: false,
            };
          });
        }}
        onClickScene={() =>
          setClick((prev) => {
            console.log(prev);
            if (prev?.isVr) {
              if (prev?.fuse === "cashier") {
                handleMove("-2 0 -2.3", "0 0 0");
                if (prev?.cameraPosition === "-2 0 -2.3") {
                  console.log("modal action");
                  return {
                    ...prev,
                    cameraPosition: "-2 0 -2.3",
                    show: !prev?.show,
                  };
                }
                return {
                  ...prev,
                  cameraPosition: "-2 0 -2.3",
                };
              }
              return {
                ...prev,
                show: false,
              };
            }
            return prev;
          })
        }
      >
        <a-entity
          button-controls
          gltf-model="#store"
          position="0 0 0"
        ></a-entity>
        <a-box
          cursor-listener
          position="-2 0.5 -8.62"
          width="4"
          height="5"
          depth="10"
          material={"opacity:0.0;"}
        />
        <a-entity light="color: #fff; intensity: 1" position="4 4 5"></a-entity>
        <a-entity
          light="color: #fff; intensity: 1"
          position="-4 4 -5"
        ></a-entity>
        <a-entity
          light="color: #fff; intensity: 0.2"
          position="4 -4 5"
        ></a-entity>
        <a-entity
          light="color: #fff; intensity: 0.2"
          position="-4 -4 -5"
        ></a-entity>

        {click?.isVr ? (
          <a-entity id="camera" position="0 0 0">
            <a-camera position="0 0 0">
              <a-cursor color="red" position="0 0 -1"></a-cursor>
            </a-camera>
          </a-entity>
        ) : (
          <a-camera id="camera" position="0 1.5 0" touch-enabled="true">
            <a-entity
              cursor="rayOrigin: mouse; fuseTimeout: 0"
              position="0 0 -1"
              touch-enabled="true"
              geometry="primitive: ring; radiusOuter: 0; radiusInner: 0"
            ></a-entity>
          </a-camera>
        )}
      </WrapperScene>
    </>
  );
}

export default Store;
