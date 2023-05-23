import React from "react";
import * as C from "./styles";
export const Slide = ({ data }) => {
  return (
    <>
      {data && (
        <C.Container
          style={{
            backgroundSize: "cover",
            backgroundPosition: "top",
            backgroundImage: `url(${data.photos[0].url})`,
          }}
        >
          <div className="featuredVertical">
            <div className="merge">
              <div className="content">
                <h2>{data.title}</h2>
                <p>
                  {data.content.lenght > 50
                    ? `${data.content.substring(0, 50)}...`
                    : data.content}
                </p>
                <button>More</button>
              </div>
            </div>
          </div>
        </C.Container>
      )}
    </>
  );
};
