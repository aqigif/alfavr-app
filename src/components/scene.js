import { Scene } from "aframe-react";
import { useEffect, useState } from "react";

function WrapperScene({ children, assets, environment }) {
  const [assetReady, setAssetReady] = useState(false);

  useEffect(() => {
    setAssetReady(true);
  }, []);
  return (
    <div style={{
      position: "absolute", height: "100%", width: "100%"
    }}>
      <Scene environment={environment}>
        {assets}
        {assetReady && children}
      </Scene>
    </div>
  );
}

export default WrapperScene;
