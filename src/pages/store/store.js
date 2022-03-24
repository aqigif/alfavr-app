import React, { useState } from "react";
import Modal from "../../components/modal";
import WrapperScene from "../../components/scene";
import DrinkMenuContent from "./components/drinkMenuContent";

const Assets = () => {
  return (
    <a-assets>
      <a-asset-item
        id="store"
        src="/assets/alfamart-6.glb"
      ></a-asset-item>
    </a-assets>
  );
};

const DrinkMenu = ({ open, setOpen, onClose }) => {
  return (
    <Modal
      open={open}
      setOpen={setOpen}
      onClose={onClose}
      title="Choose Drinks"
    >
      <DrinkMenuContent onClose={onClose} />
    </Modal>
  );
};

function Store() {
  // const [cameraPosition, setCameraPosition] = useState("0 1.5 10");
  const [menuOpen, setOpenMenu] = useState({
    status: false,
    menu: "",
  });

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
      <WrapperScene assets={<Assets />} noVr={params?.["plain"] !== undefined} forceVR={params?.["vr-mode"] !== undefined}>
        <a-entity gltf-model="#store" position="0 0 0"></a-entity>
        {/* <Entity
          primitive="a-circle"
          events={{
            click: () => handleMove("0 2 3"),
          }}
          position="0 1.5 5"
          rotation="0 0 0"
          material="opacity: 0.0; transparent: true"
        /> */}
        {/* <Entity
          primitive="a-box"
          events={{
            click: () => handleMove("0 1.5 10"),
          }}
          position="0 1.5 4"
          rotation="0 0 0"
          material="opacity: 0.0; transparent: true"
        />
        <Entity
          primitive="a-plane"
          events={{
            click: () => {
              if (cameraPosition === "0.40 2 -1.5") {
                setOpenMenu({
                  status: true,
                  menu: "drink",
                });
              } else if (cameraPosition !== "0 1.5 10") {
                handleMove("0.40 2 -1.5");
              }
            },
          }}
          position="0.35 2 -3"
          rotation="0 0 0"
          height="40"
          width="40"
          material="opacity: 0.0; transparent: true"
        />
        <Entity
          primitive="a-plane"
          events={{
            click: () => {
              if (cameraPosition === "-4,5 2 0.9") {
              } else if (cameraPosition !== "0 1.5 10") {
                handleMove("-4,5 2 0.9");
              }
            },
          }}
          position="-5.5 0 0.9"
          rotation="0 80 0"
          height="10"
          width="4"
          material="opacity: 0.0; transparent: true"
        />
        <Entity
          primitive="a-plane"
          events={{
            click: () => {
              if (cameraPosition === "-4,5 2 0.9") {
              } else if (cameraPosition !== "0 1.5 10") {
                handleMove("-4,5 2 0.9");
              }
            },
          }}
          position="-5.5 0 0.9"
          rotation="0 80 0"
          height="10"
          width="4"
          material="opacity: 0.0; transparent: true"
        /> */}
        {/* <a-entity light="color: #fff; intensity: 1" position="4 4 5"></a-entity>
        <a-entity light="color: #fff; intensity: 1" position="-4 4 -5"></a-entity>
        <a-entity light="color: #fff; intensity: 0.2" position="4 -4 5"></a-entity>
        <a-entity light="color: #fff; intensity: 0.2" position="-4 -4 -5"></a-entity> */}
        <a-camera
          position="0 1.5 0"
          // wasd-controls-enabled="false"
          touch-enabled="true"
          id="camera"
        >
          <a-entity
            cursor="rayOrigin: mouse; fuseTimeout: 0"
            position="0 0 -1"
            geometry="primitive: ring; radiusOuter: 0; radiusInner: 0"
          ></a-entity>
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
