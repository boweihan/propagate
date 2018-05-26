import { Dimensions } from 'react-native';
import Colors from '../../constants/colors';

const Width = Dimensions.get('window').width;

export default {
  instructions: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  instructions_header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: Width * 0.9,
    marginTop: 30,
  },
  menuContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backToMenu: {
    backgroundColor: Colors.darkRed,
    padding: 5,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 5,
    marginBottom: 20,
    flex: 1,
    justifyContent: 'center',
  },
  menuText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    color: Colors.white,
    fontFamily: 'MontserratBold',
  },
  instructionsText: {
    fontSize: 20,
    padding: 5,
    paddingLeft: 8,
    paddingRight: 8,
    fontFamily: 'MontserratBold',
  },
  instructionsElement: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructionsBox: {
    backgroundColor: Colors.green,
    padding: 5,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 5,
    marginBottom: 20,
    width: '95%',
    flex: 1,
    justifyContent: 'center',
  },
  stepsContainer: {
    backgroundColor: Colors.lightgray,
    padding: 5,
    borderRadius: 5,
  },
  step: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 40,
    height: '100%',
  },
  stepNumberText: {
    fontFamily: 'MontserratBold',
    fontSize: 20,
    marginVertical: 30,
    color: Colors.black,
  },
  stepImage: {
    width: Width * 0.8,
    resizeMode: 'contain',
  },
  swipe: {
    marginBottom: 30,
    fontSize: 60,
    color: Colors.black,
  },
};
