import React, { useState } from "react";
import WrapperScene from "../../components/scene";

const Assets = () => {
  return (
    <a-assets>
      <a-asset-item id="store" src="/assets/alfamart-6.glb"></a-asset-item>
      {/* <a-asset-item id="store-fbx" src="/assets/alfamart.FBX"></a-asset-item> */}
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

        AFRAME.registerComponent("close-shop", {
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
                    fuse: "",
                    show: false,
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
                  trigger: "click",
                  fuse: "shop",
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
            if (prev?.isVr) {
              if (prev?.fuse === "cashier") {
                handleMove("-2 0 -2.3", "0 0 0");
                if (prev?.cameraPosition === "-2 0 -2.3") {
                  return {
                    ...prev,
                    cameraPosition: "-2 0 -2.3",
                    show: true,
                  };
                }
                return {
                  ...prev,
                  cameraPosition: "-2 0 -2.3",
                };
              } else if (prev?.fuse === "shop") {
                return {
                  ...prev,
                  cameraPosition: "-2 0 -2.3",
                  show: false,
                };
              }
              return {
                ...prev,
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
          class="clickable"
        />

        {click?.isVr ? (
          <a-entity id="camera" position="0 0 0">
            <a-camera position="0 0 0">
              <a-cursor
                color="red"
                position="0 0 -1"
                scale="1 1 1"
                animation__fusing="property: scale; startEvents: fusing; easing: easeInCubic; dur: 1500; from: 1 1 1; to: 2 2 2"
                animation__mouseleave="property: scale; startEvents: mouseleave; easing: easeInCubic; dur: 1500; from: 2 2 2; to: 1 1 1"
                raycaster="objects: .clickable"
                fuse="true"
              ></a-cursor>
            </a-camera>
          </a-entity>
        ) : (
          <a-camera id="camera" position="0 1.5 0" touch-enabled="true">
            <a-entity
              cursor="rayOrigin: mouse; fuseTimeout: 0"
              scale="0 0 0"
              position="0 0 -1"
              touch-enabled="true"
              geometry="primitive: ring; radiusOuter: 0; radiusInner: 0"
            ></a-entity>
          </a-camera>
        )}
        {click?.show && (
          <>
            <a-plane
              width="1.9"
              height="1.3"
              color="white"
              opacity="0.9"
              position="-2 1.55 -3.499"
            >
              <a-text
                position="-0.85 0.5 0"
                height="1"
                value="Welcome to"
                color="black"
                scale="0.5 0.5 0.5"
              ></a-text>
              <a-text
                position="-0.85 0.37 0"
                value="Alfamart Virtual Store"
                color="black"
                scale="0.6 0.6 0.6"
              ></a-text>
              <a-text
                position="-0.85 0.26 0"
                color="black"
                value="Marketplace where you can buy everything virtually"
                scale="0.2 0.2 0.2"
              ></a-text>
              <a-plane
                width="1.5"
                height="0.01"
                color="red"
                position="-0.20 0.20 0.01"
              ></a-plane>
              <a-plane
                width="0.5"
                height="0.1"
                color="red"
                position="-0.59 0.10 0.01"
                close-shop
                class="clickable"
              >
                <a-text
                  position="-0.1 0 0"
                  value="Shop Now"
                  scale="0.2 0.2 0.2"
                ></a-text>
              </a-plane>
            </a-plane>
          </>
        )}
      </WrapperScene>
    </>
  );
}

export default Store;
