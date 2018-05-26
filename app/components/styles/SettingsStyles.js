import { Dimensions } from 'react-native';
import Colors from '../../constants/colors';

const Width = Dimensions.get('window').width;

export default {
  settings: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  settings_header: {
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
  settingsText: {
    fontSize: 20,
    padding: 5,
    paddingLeft: 8,
    paddingRight: 8,
    fontFamily: 'MontserratBold',
  },
  settingsElement: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsBox: {
    backgroundColor: Colors.orange,
    padding: 5,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 5,
    marginBottom: 20,
    width: '95%',
    flex: 1,
    justifyContent: 'center',
  },
  menu: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  settingsButton: {
    backgroundColor: Colors.lightBrown,
    padding: 16,
    borderRadius: 5,
    width: '80%',
    margin: 5,
  },
  settingsButtonText: {
    fontSize: 15,
    color: Colors.white,
    fontFamily: 'MontserratBold',
    textAlign: 'center',
  },
  progressText: {
    fontSize: 15,
    color: Colors.white,
    fontFamily: 'MontserratBold',
    textAlign: 'center',
  },
  triColorStatus: {
    textDecorationLine: 'underline',
    color: Colors.white,
  },
};
