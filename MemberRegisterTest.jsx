import React, { useEffect, useState } from "react";
import PageLayout from "../../containers/PageLayout";
import SideImgBG from "../../components/pagedecorate/SideImgBG";
import UnselectRadioButton from "../../assets/images/Additional/realthaiUnselectRadioButton.png";
import SelectRadioButton from "../../assets/images/Additional/realthaiSelectRadioButton.png";
import CRMOption from "../../CCFDUI/components/UI/CRMOption";
import CRMInput from "../../CCFDUI/components/UI/CRMInput";
import CRMButton from "../../CCFDUI/components/UI/CRMButton";
import DateofBirth from "../../components/register/DateofBirth";
import optionIcon from "../../assets/images/icon/option-symbol.png";
import "../../assets/styles/input/base-modify.css";
import "../../assets/styles/memberRegister.css";
import CRMCheckBox from "../../CCFDUI/components/UI/CRMCheckBox";
import Axios from "axios";
import { config } from "../../configs/Constant";

function MemberRegister(props) {
  //state and effect
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [disableBTN, setDisableBTN] = useState(true);
  const [customerGroup, setCustomerGroup] = useState(0);

  const [globalData, setGlobalData] = useState({
    state: {}
  });
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState("redux");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [provinceId, setProvinceId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [subDistrictId, setSubDistrictId] = useState("");

  const [disableDistrictFlag, setDisableDistrictFlag] = useState(true);
  const [disableSubDistrictFlag, setDisableSubDistrictFlag] = useState(true);

  useEffect(() => {
    setMobileNo("0659240106");

    validateAllValue();
  });

  //   useEffect(() => {
  //     const fetchData = async ()=> {
  //         try{
  //             const result = await Axios.get(`${config.localUrl}/province`);
  //             setData(result.data);
  //         }catch(error){
  //             setIsError(true);
  //         }
  //         setIsLoading(false);
  //     }

  //     fetchData();
  //   }, []);

  async function fetchData(data) {
    setIsLoading(true);
    try {
      const result = await Axios.get(
        // "http://localhost:3000/" + data.customData.url
        "http://192.168.0.225:3000/" + data.customData.url
      );

      let array = [];
      //need to specify Type to the real Schema API for know what is type of the data
      array.push(
        globalData.state.retail.buildPattern(
          "-",
          `<div>-</div>`,
          { Type: data.customData.type, id: "0", name: "-" },
          "-"
        )
      );
      result.data.map(o => {
        let selectData = o;
        selectData.Type = data.customData.type;
        selectData.RequestObj = data.requestObj;
        array.push(
          globalData.state.retail.buildPattern(
            o.name,
            `<div>${o.name}</div>`,
            selectData,
            o.name + " " + o.id
          )
        );
      });
      data.updateSelection(data, array);
    } catch (error) {
      setIsError(true);
      let array = [];
      array.push(
        globalData.state.retail.buildPattern(
          Error,
          `<div style="background-color:red">Error</div>`,
          { error: true },
          ""
        )
      );
      data.updateSelection(data, array);
    }
    setIsLoading(false);
  }

  function onSelected(data) {
    if (data.error) return;
    console.log(data);
    console.log(globalData);

    //province
    if (data.Type === 2 && data.id === "0") {
      setDisableDistrictFlag(true);
      setDisableSubDistrictFlag(true);
      setProvinceId(data.id);
      globalData.state.district.setDisplayData("");
      globalData.state.subDistrict.setDisplayData("");
      setDistrictId("0");
      setSubDistrictId("0");
      return;
    }
    if (data.Type === 2 && data.id !== "0") {
      setDisableDistrictFlag(false);
      setProvinceId(data.id);
      globalData.state.district.setDisplayData("");
      globalData.state.subDistrict.setDisplayData("");
      setDistrictId("0");
      setSubDistrictId("0");
      return;
    }
    //district
    if (data.Type === 3 && data.id === "0") {
      setDisableSubDistrictFlag(true);
      setDistrictId(data.id);
      globalData.state.subDistrict.setDisplayData("");
      setSubDistrictId("0");
      return;
    }
    if (data.Type === 3 && data.id !== "0") {
      setDisableSubDistrictFlag(false);
      setDistrictId(data.id);
      globalData.state.subDistrict.setDisplayData("");
      setSubDistrictId("0");
      return;
    }
    //sub-district
    if (data.Type === 4) {
      setSubDistrictId(data.id);
      return;
    }
    // if (data.Type == 1) globalData.state.province2.setDisplayData("");
    // let getElement = document.getElementById(globalData.state.district.props.id);
  }

  //check whether that normal value or default (-) when user selected value
  function manageSelectedValue(data) {
    if (data.id === "0") {
    }
  }

  //common function helper
  function isStringIsNullOrEmpty(text) {
    return text === null || text === "";
  }

  //function for this component
  function validateAllValue() {
    if (
      !isStringIsNullOrEmpty(firstName) &&
      !isStringIsNullOrEmpty(lastName) &&
      customerGroup !== 0
    ) {
      //set disable to false / pass all
      setDisableBTN(false);
    } else {
      //disable
      setDisableBTN(true);
    }
    // console.log(firstName, lastName);
  }

  function handleFirstName(e) {
    setFirstName(e.value);
  }

  function handleLastName(e) {
    setLastName(e.value);
  }

  function handleClick() {
    console.log("ready to send to backend");
  }

  //rendering part
  return (
    <PageLayout bottomImg={true} topImgStyle="t2">
      <SideImgBG sideimgCustom="side-img-wrap-member" />
      <div className="base-main">
        <div className="base-frame col vmiddle">
          <div className="phone-base">
            <form
              onSubmit={event => {
                // console.log("You Submitted Form");
                alert("You Submitted Form");
                event.preventDefault();
              }}
            >
              <div className="phone-wrap">
                <div className="headline font-t-5 shadow-pad">
                  ลงทะเบียนเพื่อร่วมกิจกรรม
                </div>
                <div className="headtopic font-t-5 shadow-pad w100p aleft paddingLeft-5">
                  ประเภทกลุ่มลูกค้า
                </div>
                <div className="radioLabelBlock">
                  <label
                    className="paddingLeft-5"
                    onClick={() => setCustomerGroup(1)}
                  >
                    <img
                      src={
                        customerGroup === 1
                          ? SelectRadioButton
                          : UnselectRadioButton
                      }
                      className="radioButton inLineBlock"
                    />
                    <div className="inLineBlock choiceMessage font-t-5">
                      ลูกค้าทั่วไป
                    </div>
                  </label>
                </div>
                <div className="radioLabelBlock">
                  <label
                    className="paddingLeft-5"
                    onClick={() => setCustomerGroup(2)}
                  >
                    <img
                      src={
                        customerGroup === 2
                          ? SelectRadioButton
                          : UnselectRadioButton
                      }
                      className="radioButton inLineBlock"
                    />
                    <div className="inLineBlock choiceMessage font-t-5">
                      ลูกค้าผู้ประกอบการ (ร้านอาหาร, ร้านขนม)
                    </div>
                  </label>
                </div>
                <div className="radioLabelBlock">
                  <label
                    className="paddingLeft-5"
                    onClick={() => setCustomerGroup(3)}
                  >
                    <img
                      src={
                        customerGroup === 3
                          ? SelectRadioButton
                          : UnselectRadioButton
                      }
                      className="radioButton inLineBlock"
                    />
                    <div className="inLineBlock choiceMessage font-t-5">
                      ร้านค้าทั่วไป
                    </div>
                  </label>
                </div>
                <br />
                <div className="headtopic font-t-5 shadow-pad w100p aleft paddingLeft-5">
                  สถานที่ที่ซื้อสินค้าประจำ
                </div>
                {/* <CRMInput
                                    className="normal-input gapFromEdgeScreen"
                                /> */}
                <div className="gapFromEdgeScreen">
                  <CRMOption
                    id="retail"
                    className="normal-input"
                    requestObj={{ abc: 0, DA: 1 }}
                    onRequest={fetchData}
                    connectRef={globalData}
                    onSelected={onSelected}
                    customData={{ a: 1, b: 2, type: 1, url: "retailstore" }}
                    optionHeight="100%"
                    optionMaxHeight="300px"
                    iconright={optionIcon}
                    iconleft={optionIcon}
                    iconhideleft={true}
                    searchable={true}
                    text="เลือกร้านสรรพสินค้า"
                    type="button"
                  />
                </div>
                <div>
                  <span className="headtopic font-t-5 w50p shadow-pad aleft paddingLeft-5">
                    ชื่อ
                  </span>
                  <span className="headtopic font-t-5 w50p shadow-pad aleft paddingLeft-5">
                    นามสกุล
                  </span>
                </div>
                <div>
                  <CRMInput
                    className="normal-input inLineBlock w42p5"
                    value={firstName}
                    onChange={handleFirstName}
                    maxLength="30"
                  />
                  <div className="inLineBlock w5p"></div>
                  <CRMInput
                    className="normal-input inLineBlock w42p5"
                    value={lastName}
                    onChange={handleLastName}
                    maxLength="30"
                  />
                </div>

                <div className="headtopic font-t-5 shadow-pad w100p aleft paddingLeft-5">
                  เบอร์โทรศัพท์
                </div>
                <CRMInput
                  className="normal-input disabled gapFromEdgeScreen"
                  disabled={true}
                  value={mobileNo}
                />
                <div className="headtopic font-t-5 shadow-pad w100p aleft paddingLeft-5">
                  วันเกิด
                </div>
                <div className="gapFromEdgeScreen">
                 <DateofBirth 
                 
                                
                 />
                </div>
                {/* <div>
                  <div className="inLineBlock w22p">
                    <CRMOption
                      id="province"
                      className="normal-input"
                      requestObj={{ abc: 0, DA: 1 }}
                      onRequest={fetchData}
                      connectRef={globalData}
                      onSelected={onSelected}
                      customData={{ a: 1, b: 2, type: 2, url: "province" }}
                      optionHeight="100%"
                      optionMaxHeight="300px"
                      iconright={optionIcon}
                      iconleft={optionIcon}
                      iconhideleft={true}
                      searchable={false}
                      text="วัน"
                      type="button"
                    />
                  </div>
                  <div className="inLineBlock w5p"></div>
                  <div className="inLineBlock w35p">
                    <CRMOption
                      id="province"
                      className="normal-input"
                      requestObj={{ abc: 0, DA: 1 }}
                      onRequest={fetchData}
                      connectRef={globalData}
                      onSelected={onSelected}
                      customData={{ a: 1, b: 2, type: 2, url: "province" }}
                      optionHeight="100%"
                      optionMaxHeight="300px"
                      iconright={optionIcon}
                      iconleft={optionIcon}
                      iconhideleft={true}
                      searchable={false}
                      text="เดือน"
                      type="button"
                    />
                  </div>
                  <div className="inLineBlock w2p5"></div>
                  <div className="inLineBlock w25p">
                    <CRMOption
                      id="province"
                      className="normal-input"
                      requestObj={{ abc: 0, DA: 1 }}
                      onRequest={fetchData}
                      connectRef={globalData}
                      onSelected={onSelected}
                      customData={{ a: 1, b: 2, type: 2, url: "province" }}
                      optionHeight="100%"
                      optionMaxHeight="300px"
                      iconright={optionIcon}
                      iconleft={optionIcon}
                      iconhideleft={true}
                      searchable={false}
                      text="ปี"
                      type="button"
                    />
                  </div>
                </div> */}

                <div className="headtopic font-t-5 shadow-pad w100p aleft paddingLeft-5">
                  เพศ
                </div>
                <div>
                  <div className="normal-input input-base inLineBlock w42p5"></div>
                  <div className="inLineBlock w5p"></div>
                  <div className="normal-input input-base inLineBlock w42p5"></div>
                </div>
                <div>
                  <span className="headtopic font-t-5 w50p shadow-pad aleft paddingLeft-5">
                    จังหวัด
                  </span>
                  <span className="headtopic font-t-5 w50p shadow-pad aleft paddingLeft-5">
                    {/* รหัสไปรษณีย์ */}
                    อำเภอ
                  </span>
                </div>
                <div>
                  {/* <CRMInput className="normal-input inLineBlock w42p5" /> */}
                  <div className="inLineBlock w42p5">
                    <CRMOption
                      id="province"
                      className="normal-input"
                      requestObj={{ abc: 0, DA: 1 }}
                      onRequest={fetchData}
                      connectRef={globalData}
                      onSelected={onSelected}
                      customData={{ a: 1, b: 2, type: 2, url: "province" }}
                      optionHeight="100%"
                      optionMaxHeight="300px"
                      iconright={optionIcon}
                      iconleft={optionIcon}
                      iconhideleft={true}
                      searchable={false}
                      text="จังหวัด"
                      type="button"
                    />
                  </div>
                  <div className="inLineBlock w5p"></div>
                  <div className="inLineBlock w42p5">
                    <CRMOption
                      id="district"
                      className="normal-input"
                      requestObj={{ abc: 0, DA: 1 }}
                      onRequest={fetchData}
                      connectRef={globalData}
                      onSelected={onSelected}
                      customData={{ a: 1, b: 2, type: 3, url: "district" }}
                      optionHeight="100%"
                      optionMaxHeight="300px"
                      iconright={optionIcon}
                      iconleft={optionIcon}
                      iconhideleft={true}
                      searchable={false}
                      text="อำเภอ"
                      type="button"
                      disabled={disableDistrictFlag}
                    />
                  </div>
                  {/* <CRMInput className="normal-input inLineBlock w42p5" /> */}
                </div>
                <div>
                  <span className="headtopic font-t-5 w50p shadow-pad aleft paddingLeft-5">
                    แขวง/ตำบล
                  </span>
                  <span className="headtopic font-t-5 w50p shadow-pad aleft paddingLeft-5">
                    รหัสไปรษณีย์
                  </span>
                </div>
                <div>
                  {/* <CRMInput className="normal-input inLineBlock w42p5" /> */}
                  <div className="inLineBlock w42p5">
                    <CRMOption
                      id="subDistrict"
                      className="normal-input"
                      requestObj={{ abc: 0, DA: 1 }}
                      onRequest={fetchData}
                      connectRef={globalData}
                      onSelected={onSelected}
                      customData={{ a: 1, b: 2, type: 4, url: "subDistrict" }}
                      optionHeight="100%"
                      optionMaxHeight="300px"
                      iconright={optionIcon}
                      iconleft={optionIcon}
                      iconhideleft={true}
                      searchable={false}
                      text="แขวง/ตำบล"
                      type="button"
                      disabled={disableSubDistrictFlag}
                    />
                  </div>
                  <div className="inLineBlock w5p"></div>
                  <CRMInput className="normal-input input-base shadow inLineBlock w42p5" />
                  {/* <CRMInput className="normal-input inLineBlock w42p5" /> */}
                </div>

                <div className="itemIncluded"></div>
                <div>
                  <CRMCheckBox className="inLineBlock w5p checkBox termCondition" />
                  <span className="headtopic font-t-5 w85p shadow-pad aleft paddingLeft-5 inLineBlock">
                    ข้าพเจ้าตกลงยอมรับ{" "}
                    <span className="underlined termCondition">
                      ข้อกำหนดและเงื่อนไข
                    </span>
                  </span>
                </div>
                <div className="input-wrap">
                  <CRMButton
                    text="ลงทะเบียน"
                    type="submit"
                    className="button-base font-t-5 font-z-3"
                    // disabled={disableBTN}
                    // onClick={handleClick}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default MemberRegister;
