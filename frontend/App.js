import React from 'react'
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';

const App = () => {

  const cld = new Cloudinary({
    cloud: { cloudName: 'dqkssrvir' }
  });

  const imageIds = [
    "bracelete6_awqjal",
    "bracelete9_x8gd2o",
    "bracelete2_bfnbrh",
    "bracelete8_l35rg8",
    "bracelete1_kdxnja",
    "bracelete3_dpcjmu",
    "bracelete5_pudumv",
    "bracelete7_go7dxq",
    "bracelete10_uvjnha"
  ];

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      {imageIds.map((id, index) => {
        const img = cld
          .image(id)
          .format('auto')
          .quality('auto')
          .resize(auto().gravity(autoGravity()).width(300).height(300));

        return <AdvancedImage key={index} cldImg={img} />;
      })}
    </div>
  );
};

export default App;