import React, { useState } from "react";
import Modal from "../../components/modal";
import WrapperScene from "../../components/scene";
import DrinkMenuContent from "./components/drinkMenuContent";

const Assets = () => {
  return (
    <a-assets>
      <a-asset-item id="store" src="/assets/alfamart-6.glb"></a-asset-item>
    </a-assets>
  );
};

const DrinkMenu = ({ open, setOpen, onClose }) => {
  return (
    <Modal
      open={open}
      setOpen={setOpen}
      onClose={onClose}
      title="Selamat Datang"
    >
      <DrinkMenuContent onClose={onClose} />
    </Modal>
  );
};

function Store() {
  const AFRAME = window?.AFRAME;
  const [isVr, setVr] = useState(false);
  // const [cameraPosition, setCameraPosition] = useState("0 1.5 10");
  const [menuOpen, setOpenMenu] = useState({
    status: false,
    menu: "",
  });

  React.useEffect(() => {
    if (AFRAME) {
      handleCassier();
    }
  }, [AFRAME]);

  const handleCassier = () => {
    try {
      if (AFRAME) {
        AFRAME.registerComponent("cursor-listener", {
          init: function () {
            this.el.addEventListener("click", function (evt) {
              console.log("I was clicked at: ", evt.detail.intersection.point);
              setOpenMenu({
                status: true,
                menu: "drink",
              });
            });
          },
        });
      }
    } catch (error) {}
  };
  // const handleMove = (to) => {
  //   setCameraPosition(to);
  //   const cameraRig = document.getElementById("camera");
  //   cameraRig.setAttribute(
  //     "animation",
  //     `property: position; from: ${cameraPosition}; to: ${to}; dur: 700`
  //   );
  // };
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  return (
    <>
      <WrapperScene
        assets={<Assets />}
        noVr={params?.["plain"] !== undefined}
        forceVR={params?.["vr-mode"] !== undefined}
        onEnterVR={() => setVr(true)}
        onExitVR={() => setVr(false)}
      >
        <a-entity gltf-model="#store" position="0 0 0"></a-entity>
        <a-box
          cursor-listener
          position="-2 0.5 -4"
          width="4"
          height="5"
          material="opacity: 0.0; transparent: true"
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
        <a-camera position="0 1.5 0" touch-enabled="true">
          {isVr ? (
            <a-cursor color="black"></a-cursor>
          ) : (
            <a-entity
              cursor="rayOrigin: mouse; fuseTimeout: 0"
              position="0 0 -1"
              geometry="primitive: ring; radiusOuter: 0; radiusInner: 0"
            ></a-entity>
          )}
        </a-camera>
        <DrinkMenu
          open={menuOpen?.status}
          setOpen={setOpenMenu}
          onClose={() => setOpenMenu({ status: false })}
        />
      </WrapperScene>
    </>
  );
}

export default Store;
