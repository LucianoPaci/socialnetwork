import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { deleteExperience } from '../../actions/profileActions'
class Experience extends Component {
	onDeleteClick = (expId) => {
		this.props.deleteExperience(expId)
	}
	render() {
		const experience = this.props.experience.map((exp) => (
			<tr key={exp._id}>
				<td>{exp.company}</td>
				<td>{exp.title}</td>
				<td>
					<Moment format="DD/MM/YYYY">{exp.from}</Moment> -
					{exp.to === null ? ' Now' : <Moment format="DD/MM/YYYY">{exp.to}</Moment>}
				</td>
				<td>
					<button onClick={this.onDeleteClick} className="btn btn-danger">
						DELETE
					</button>
				</td>
			</tr>
		))
		return (
			<div>
				<h4 className="mb-4">Experience Credentials</h4>
				<table className="table">
					<thead>
						<tr>
							<th>Company</th>
							<th>Title</th>
							<th>Years</th>
						</tr>
						{experience}
					</thead>
				</table>
			</div>
		)
	}
}

Experience.propTypes = {
	deleteExperience: PropTypes.func.isRequired
}

export default connect(null, { deleteExperience })(Experience)
