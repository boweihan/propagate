import Colors from '../../constants/colors';

export default {
  title: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  menu: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  prop: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color: Colors.lightBrown,
    fontSize: 35,
    fontFamily: 'MontserratBold',
  },
  agate: {
    color: Colors.darkRed,
    fontFamily: 'MontserratBold',
  },
  highestLevel: {
    marginTop: 30,
    backgroundColor: Colors.gray,
    padding: 10,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 5,
    width: 120,
  },
  highestLevelText: {
    fontSize: 15,
    color: Colors.white,
    fontFamily: 'MontserratBold',
    textAlign: 'center',
  },
  highestLevelStatus: {
    color: Colors.lightRed,
    fontFamily: 'MontserratBold',
    fontSize: 40,
    textAlign: 'center',
    backgroundColor: Colors.white,
    marginVertical: 10,
    marginHorizontal: 10,
  },
};
