import React from "react";
import { FaCalendarCheck, FaDollarSign, FaPeopleGroup } from "react-icons/fa6";

const TotalUsing = () => {
  return (
    <div>
      <div className="parent-total">
        <div className="container-total">
          <div className="card">
            <div className="icon">
              <button>
                <FaCalendarCheck />
              </button>
            </div>
            <div className="total">
              <h3>1.5K</h3>
              <p>New Orders</p>
            </div>
          </div>
          <div className="card">
            <div className="icon">
              <button>
                <FaPeopleGroup />
              </button>
            </div>
            <div className="total">
              <h3>1M</h3>
              <p>Clients</p>
            </div>
          </div>
          <div className="card">
            <div className="icon">
              <button>
                <FaDollarSign />
              </button>
            </div>
            <div className="total">
              <h3>$900k</h3>
              <p>Turnover</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalUsing;
