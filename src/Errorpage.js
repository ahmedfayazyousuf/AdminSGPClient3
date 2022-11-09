import React from 'react';
import { NavLink } from "react-router-dom";

const Errorpage = () => {
    return (
        <>
            <div className="form-body">
                <div className="form-holder">
                        <div className="form-content">
                            <div className="form-items">
                                <form>
                                    <div class="container" className="profilepanel">
                                                <div class="row" className="profilepanel">
                                                    <h5>404 Not Found</h5>
                                                </div>

                                                <div className="form-button mt-3">
                                                    <NavLink className="btn btn-primary"to="/">Home</NavLink>
                                                </div>
                                    </div>
                                </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Errorpage