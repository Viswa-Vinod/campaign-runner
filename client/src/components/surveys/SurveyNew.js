import React, { Component } from "react";
import { reduxForm } from "redux-form";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";

class SurveyNew extends Component {
	//constructor function is the classical way of initializing state in a component
	// constructor(props) {

	// 	super(props);
	// 	this.state= {showFormReview: false}
	// }

	//we are not using the classical constructor function to initialize state because create-react-app
	//provides an easier way to do it with a babel-plugin

	state = { showFormReview: false };

	renderContent() {
		return this.state.showFormReview ? (
			<SurveyFormReview
				onCancel={() => this.setState({ showFormReview: false })}
			/>
		) : (
			<SurveyForm
				onSurveySubmit={() => this.setState({ showFormReview: true })}
			/>
		);
	}

	render() {
		return <div>{this.renderContent()}</div>;
	}
}
//SurveyNew has to be connected to reduxForm because we want to dump the values of the form
//once we navigate away from the form to another page. Redux form's default value is to dump form
//values on unmounting of a component.
export default reduxForm({ form: "surveyForm" })(SurveyNew);
