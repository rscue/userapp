import colors from '../../themes/Colors';

const styles = {
  buttonContainer: {
    paddingTop: 15
  },
  button: {
    borderColor: colors.background,
    backgroundColor: colors.primary,
    borderRadius: 3,
    margin: 0,
    padding: 0
  },
  buttonText: {
    color: 'white'
  },
  btnImageContainer: {
    paddingTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnImage: {
    borderColor: colors.background,
    backgroundColor: colors.primary,
    borderWidth: 10,
    borderRadius: 20,
    alignSelf: 'center',
    position: 'absolute',
    top: 170,
    left: 200,
    elevation: 10
  },
  imageContainer: {
    elevation: 10,
    backgroundColor: 'grey',
    borderRadius: 200
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 200
  }
};

export default styles;
