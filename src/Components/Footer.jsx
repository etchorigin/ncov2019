import React from "react";
import { Card } from "@blueprintjs/core";

const Footer = () => {
  return (
    <div className="Footer-Container ">
      <Card className="Statistics-Card">
        <p className="bp3-text-small bp3-text-muted">
          Data Sources:{" "}
          <a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/situation-reports">
            WHO
          </a>
          ,{" "}
          <a href="https://www.cdc.gov/coronavirus/2019-ncov/index.html">CDC</a>
          , <a href="http://www.nhc.gov.cn/yjb/s3578/new_list.shtml">NHC</a> and{" "}
          <a href="https://3g.dxy.cn/newh5/view/pneumonia?scene=2&clicktime=1579582238&enterid=1579582238&from=singlemessage&isappinstalled=0">
            Ding Xiang Yuan
          </a>
        </p>
        <p className="bp3-text-small bp3-text-muted">
          Back-End: <a href="https://systems.jhu.edu/">JHU CSSE</a>, Front-End:{" "}
          <a href="https://github.com/etchorigin/ncov2019">
            https://github.com/etchorigin/ncov2019
          </a>
        </p>
      </Card>
    </div>
  );
};

export default Footer;
