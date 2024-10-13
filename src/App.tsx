

import React, { useEffect, useMemo, useRef, useState } from "react";
import { processList } from "./longProcess/enum";
import Loader from "./components/Loader";
import './index.css'
import Table from "./components/Tables";
import { profiles } from "./data";
type LengthCountType = {
  loading: boolean;
  value: number;
};

export type ProfileType = {
  albumId: number | string;
  id: number | string;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export type ProfileListType = {
  loading: boolean;
  list: unknown & Array<ProfileType>;
  page: number;
};

export type GetDataType = {
  action: string;
  period: "initial" | "next" | "prev" | "pageNumber";
  thePageNumber: number;
};

export const listPageSize = 50;

const App = () => {
  const counter = useMemo(()=>new Worker(new URL('./longProcess/count.ts',import.meta.url) ,{ type: "module" }),[])
  const Profiler = useMemo(()=>new Worker(new URL('./longProcess/getData.ts',import.meta.url) ,{ type: "module" }),[])

  const [lengthCount, setLengthCount] = useState<LengthCountType>({
    loading: true,
    value: 0,
  });
  const [profileList, setProfileList] = useState<ProfileListType>({
    loading: false,
    list: [],
    page: 1
  });

  useEffect(()=>{
    if(window.Worker){
      counter.postMessage(processList.count)
    }
  },[counter])

  useEffect(() => {
    if (window.Worker) {
      counter.onmessage = (e: MessageEvent<string>) => {
        setLengthCount((prev) => ({
         
          ...prev,
          loading: false,
          value: Number(e.data) && Number(e.data),
        }));
      };
    }
  }, [counter]);

  useEffect(() => {
    if (window.Worker) {
      Profiler.postMessage(processList.getData)
    }
  }, [Profiler]);


  useEffect(() => {
    if (window.Worker) {
      Profiler.postMessage(processList.getData)
    }
  }, [Profiler]);

  useEffect(()=>{
    if(window.Worker){
      Profiler.onmessage=(e)=>{

      }
    }
  },[])

// if(lengthCount.loading){
//   return <Loader size={20}/>
// }
    return (
        <main className="main-container">
                <section className="count">
        Total count of Profiles is{" "}
        <b>{lengthCount.loading ? <Loader size={14} /> : lengthCount.value}</b>
      </section>
            <section className="table-container">
              <Table list={profiles}/>
            </section>
        </main>
    )
}

export default App
