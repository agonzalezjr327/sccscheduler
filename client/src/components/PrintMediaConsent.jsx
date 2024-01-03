import React from "react";
import { useSelector } from "react-redux";

export const PrintMediaConsent = React.forwardRef((props, ref) => {
  const classSelected = useSelector((state) => state.getClasses.classInfo);
  let studentsInClass = classSelected.map((m) => m.students);

  studentsInClass = studentsInClass.flat();

  return (
    <div ref={ref} className="d-none d-print-block container font-size-10">
      {classSelected[0].students.map((c, key) => {
        return (
        <div className="p-3" key={key}>
          <div className="row mt-5 h-120px">
            <div className="col-2">
              <img
                src="./images/adc1.png"
                alt="State of Arizona Seal"
                className="img-fluid h-50"
              />
            </div>
            <div className="col-5">
              <p>
                <b>Arizona Department of Corrections</b> <br />
                <b>Rehabilitation and Reentry</b>
              </p>
              <p>
                <b>Media Consent</b>
              </p>
            </div>
            <div className="col-5">
              <p className="lh-1 border border-3 border-dark p-2">
                <b>
                  Arizona Department of Corrections, Rehabilitation and Reentry
                </b>{" "}
                <br />
                <b>1601 W. Jefferson Street</b> <br />
                <b>Phoenix, Arizona 85007</b> <br />
                <b>Telephone Number: 602-542-3133</b> <br />
                <b>Fax Number: 602-542-2859</b> <br />
                <b>Email: MediaRelations@azadc.gov</b>
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-6 border border-3 border-dark h-40px border-bottom-0 border-end-0">
              <p>
                <b>REQUESTING PARTY</b>
              </p>
            </div>
            <div className="col-6 border border-3 border-dark h-40px border-bottom-0">
              <p>
                <b>
                  REQUEST DATE{" "}
                  <small>
                    <i>(mm/dd/yyyy)</i>
                  </small>
                </b>
              </p>
            </div>
            <div className="col-6 border border-3 border-dark h-40px border-end-0">
              <p>
                <b>ORGANIZATION</b>
              </p>
            </div>
            <div className="col-6 border border-3 border-dark h-40px">
              <p>
                <b>TELEPHONE NUMBER</b> <br />
                <b>( )</b>
              </p>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-6 border border-3 border-dark h-40px border-bottom-0 border-end-0">
              <p>
                <b>
                  INMATE PRINTED NAME{" "}
                  <small>
                    <b>(Last, First M.I.)</b>
                  </small> <br />
                  {c.name}
                </b>
              </p>
            </div>
            <div className="col-6 border border-3 border-dark h-40px border-bottom-0">
              <p>
                <b>ADCRR NUMBER</b> <br />
                {c.adc}
              </p>
            </div>
            <div className="col-6 border border-3 border-dark h-40px border-bottom-0 border-end-0">
              <p>
                <b>INSTITUTION</b>
              </p>
            </div>
            <div className="col-6 border border-3 border-dark h-40px border-bottom-0">
              <p>
                <b>UNIT</b>
              </p>
            </div>
            <div className="col-6 border border-3 border-dark h-40px border-bottom-0 border-end-0">
              <p>
                <b>
                  CONTACT PERSON NAME{" "}
                  <small>(Last, First M.I.) (Please print)</small>
                </b>
              </p>
            </div>
            <div className="col-6 border border-3 border-dark h-40px border-bottom-0">
              <p>
                <b>TELEPHONE NUMBER</b> <br />
                <b>( )</b>
              </p>
            </div>
            <div className="col-12 border border-3 border-dark h-150px">
              <p>
                <b>Notes</b> <br />
                Write Email and Name of Contact Clearly
              </p>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12 border border-3 border-dark">
              <div className="row mt-2">
                <div className="col">
                  <p className="mb-0">
                    <b>I,</b>
                    _________{c.name}_________________________________________________
                    <br />
                  </p>
                  <p className="text-center">
                    <small>(Print Name)</small>
                  </p>
                </div>
                <div className="col">
                  <p>
                    <b>ADCRR Number</b> <br />
                    {c.adc}
                  </p>
                </div>
              </div>
              <div className="row">
                <p>
                  <input type="checkbox" name="" id="" className="me-3" />
                  <label htmlFor="" className="me-5">
                    <b>Agree</b>
                  </label>

                  <input type="checkbox" name="" id="" className="me-3" />
                  <label htmlFor="" className="me-5">
                    <b>Do Not Agree</b>
                  </label>

                  <input type="checkbox" name="" id="" className="me-3" />
                  <label htmlFor="">
                    <b>to be Interviewed</b>
                  </label>
                </p>
              </div>
              <div className="row">
                <p>
                  <input type="checkbox" name="" id="" className="me-3" />
                  <label htmlFor="" className="me-5">
                    <b>Agree</b>
                  </label>

                  <input type="checkbox" name="" id="" className="me-3" />
                  <label htmlFor="" className="me-5">
                    <b>Do Not Agree</b>
                  </label>

                  <input type="checkbox" name="" id="" className="me-3" />
                  <label htmlFor="">
                    <b>to be Photographed</b>
                  </label>
                </p>
              </div>
              <div className="row">
                <p>
                  <input type="checkbox" name="" id="" className="me-3" />
                  <label htmlFor="" className="me-5">
                    <b>Agree</b>
                  </label>

                  <input type="checkbox" name="" id="" className="me-3" />
                  <label htmlFor="" className="me-5">
                    <b>Do Not Agree</b>
                  </label>

                  <input type="checkbox" name="" id="" className="me-3" />
                  <label htmlFor="">
                    <b>to be Video Recorded or Live Streamed</b>
                  </label>
                </p>
              </div>
              <div className="row">
                <p>
                  <input type="checkbox" name="" id="" className="me-3" />
                  <label htmlFor="" className="me-5">
                    <b>Agree</b>
                  </label>

                  <input type="checkbox" name="" id="" className="me-3" />
                  <label htmlFor="" className="me-5">
                    <b>Do Not Agree</b>
                  </label>

                  <input type="checkbox" name="" id="" className="me-3" />
                  <label htmlFor="">
                    <b>to be Audiotaped Recorded</b>
                  </label>
                </p>
              </div>
              <div className="row">
                <p>
                  <input type="checkbox" name="" id="" className="me-3" />
                  <label htmlFor="" className="me-5">
                    <b>Agree</b>
                  </label>

                  <input type="checkbox" name="" id="" className="me-3" />
                  <label htmlFor="" className="me-5">
                    <b>Do Not Agree</b>
                  </label>

                  <input type="checkbox" name="" id="" className="me-3" />
                  <label htmlFor="">
                    <b>
                      to have my Image/Likeness shown on ADCRR Social Media
                      Platforms
                    </b>
                  </label>
                </p>
              </div>
              <div className="row mt-2">
                <p>
                  I authorize the specified media representative to use any
                  information gathered for Legitimate purposes.
                </p>
              </div>
            </div>
            <div className="col-6 border border-3 border-dark h-40px border-bottom-0 border-end-0 border-top-0">
              <p>
                <b>INMATE SIGNATURE</b>
              </p>
            </div>
            <div className="col-6 border border-3 border-dark h-40px border-bottom-0 border-top-0">
              <p>
                <b>DATE</b> <small>(mm/dd/yyyy)</small> <br />
                {new Date().toLocaleDateString()}
              </p>
            </div>
            <div className="col-5 border border-3 border-dark h-40px border-end-0">
              <p>
                <b>
                  WARDEN NAME <small>(Last, First M.I.) (Please print)</small>
                </b>
              </p>
            </div>
            <div className="col-5 border border-3 border-dark h-40px border-end-0">
              <p>
                <b>SIGNATURE</b>
              </p>
            </div>
            <div className="col-2 border border-3 border-dark h-40px">
              <p>
                <b>DATE</b> <small>(mm/dd/yyyy)</small>
              </p>
            </div>
            <div className="col-12">
              <div className="row mt-2">
                <div className="col-1 d-flex justify-content-end">
                  <span>
                    <b>Distribution:</b>
                  </span>
                </div>
                <div className="col-5 text-left">
                  <span>
                    <b>Original-Complex Warden's Office</b>
                  </span>
                  <span>
                    <b>Fax Copy - Media Relations</b>
                  </span>
                </div>
                <div className="col-6 d-flex flex-column align-items-end">
                  <span>
                    <b>207-1</b>
                  </span>
                  <span>
                    <b>8/18/21</b>
                  </span>
                  <span>
                    <b className="footerNum">B1P204L</b>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        );
      })}
    </div>
  );
});
