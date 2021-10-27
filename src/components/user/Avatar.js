function Avatar({ user, styles }) {
  return user.profilePreviewImg ? (
    <img
      src={`${process.env.REACT_APP_API_URL}/images${user.profilePreviewImg}`}
      alt="img"
      className={'w-8 h-8 border border-gray-300 rounded-full '.concat(styles)}
    />
  ) : (
    <div
      className={'flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full '.concat(
        styles,
      )}
    >
      <i className="far fa-user"></i>
    </div>
  )
}

export default Avatar
