// System
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
// components
import Spinner from '../layout/Spinner'
import PostItem from '../posts/PostItem'
import CommentForm from './CommentForm'
// *
import { getPost } from '../../actions/post'

const Post = ({ getPost, post: { post, loading }, match }) => {
	useEffect(() => {
		getPost(match.params.id)
	}, [getPost, match.params.id])

	return loading || post === null ? (
		<Spinner />
	) : (
		<>
			<Link to="/posts" className="btn">
				Back To Posts
			</Link>
			<PostItem post={post} showActions={false} />
			<CommentForm postId={post._id} />
		</>
	)
}

Post.propTypes = {
	getPost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
	post: state.post,
})

export default connect(
	mapStateToProps,
	{ getPost }
)(Post)
