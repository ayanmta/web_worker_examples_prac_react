import React from "react";
import { ProfileType } from "../App";
import { profiles } from "../data";

type Props = {
  list: Array<ProfileType>;
};

const Table = ({ list }: Props) => {
  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>{profiles?.id}</th>
            <th>{profiles?.title}</th>
            <th>{profiles?.albumId}</th>
            <th>{profiles?.thumbnailUrl}</th>
          </tr>
        </thead>
        <tbody>
          {list.length > 0 &&
            list.map((item, index: number) => {
              return (
                <tr key={item?.id}>
                  <td>{index + 1}</td>
                  <td>{item?.id}</td>
                  <td>{item?.title}</td>
                  <td>{item?.albumId}</td>
                  <td>
                    <img
                      src={item?.thumbnailUrl}
                      alt={item?.title}
                      width={50}
                      height={50}
                      loading="lazy"
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;