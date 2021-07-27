import React from "react"

const MainKeywords = () => {

    return (<div>
        <div className="row cols-4">
            <div className="form-group">
                <label htmlFor="">Main keywords:</label>
            </div>
            <div className="form-group">
                <label htmlFor="">Base keywords:</label>
            </div>
        </div>

        <div className="row">
            <div className="form-group">
                <label htmlFor="">Product negative phrases:</label>
            </div>
            <div className="form-group">
                <label htmlFor="">Product negative exacts:</label>
            </div>
            <div className="form-group">
                <label htmlFor="">Negative ASINs:</label>
            </div>
            <div className="form-group">
                <label htmlFor="">Global negative phrases:</label>
            </div>
            <div className="form-group">
                <label htmlFor="">Global negative exacts:</label>
            </div>
        </div>
    </div>)
}

export default MainKeywords