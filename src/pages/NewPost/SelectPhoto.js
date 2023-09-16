import React, { useState,useRef } from "react";
import * as f from "../../components/Common/CommonStyle";
import styled from "styled-components";
import {Link, useNavigate} from 'react-router-dom';
import Navigation from "../../components/Navigation/Navigation";


const SelectPhoto = () => {

    return(
    <f.Totalframe>
      <f.SubScreen>
        <f.ScreenComponent>
            selectphoto
        </f.ScreenComponent>
      </f.SubScreen>
      <Navigation />
    </f.Totalframe>
    )
}
export default SelectPhoto;