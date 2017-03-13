const rules = {
  Community_Chest: [
    {
      Description: 'BANK ERROR IN YOUR FAVOR COLLECT $200',
      Cash: 200
    },
    {
      Description: 'FROM SALE OF STOCK YOU GET $45',
      Cash: 45
    },
    {
      Description: 'PAY HOSPITAL $100',
      Cash: -100
    },
    {
      Description: 'COLLECT $50 FROM EVERY PLAYER',
      Special: 'COLLECT_50_EVERYONE'
    },
    {
      Description: 'DOCTOR\'S FEE PAY $50',
      Cash: -50
    },
    {
      Description: 'YOU INHERIT $100',
      Cash: 100
    },
    {
      Description: 'ADVANCE TO GO COLLECT $200',
      Position: 0
    },
    {
      Description: 'PAY SCHOOL TAX OF $150',
      Cash: -150
    },
    {
      Description: 'XMAS FUND MATURES COLLECT $100',
      Cash: 100
    },
    {
      Description: 'RECEIVE FOR SERVICES $25',
      Cash: 25
    },
    {
      Description: 'INCOME TAX REFUND COLLECT $20',
      Cash: 20
    },
    {
      Description: 'LIFE INSURANCE MATURES COLLECT $100',
      Cash: 100
    },
    {
      Description: 'GO TO JAIL GO DIRECTLY TO JAIL DO NOT PASS GO DO NOT COLLECT $200',
      Special: 'JAIL'
    },
    {
      Description: 'YOU HAVE WON SECOND PRIZE IN A BEAUTY CONTEST COLLECT $10',
      Cash: 10
    },
    {
      Description: 'YOU ARE ASSESSED FOR STREET REPAIRS $40 PER HOUSE $115 PER HOTEL',
      House: 40,
      Hotel: 115
    },
    {
      Description: 'GET OUT OF JAIL FREE',
      Special: 'JAIL_FREE'
    }
  ],
  Chance: [
    {
      Description: 'ADVANCE TO GO COLLECT $200',
      Position: 0
    },
    {
      Description: 'BANK PAYS YOU DIVIDEND OF $50',
      Cash: 50
    },
    {
      Description: 'GO BACK 3 SPACES',
      Special: 'POSITION_3'
    },
    {
      Description: 'ADVANCE TOKEN TO NEAREST UTILITY. IF UNOWNED YOU MAY BUY IT FROM BANK. IF OWNED, THROW DICE AND PAY OWNER A TOTAL TEN TIMES THE AMOUNT THROWN.',
      Special: 'UTILITY'
    },
    {
      Description: 'GO DIRECTLY TO JAIL. DO NOT PASS GO. DO NOT COLLECT $200.',
      Special: 'JAIL'
    },
    {
      Description: 'PAY POOR TAX OF $15',
      Cash: -15
    },
    {
      Description: 'ADVANCE TO ST. CHARLES PLACE. IF YOU PASS GO, COLLECT $200.',
      Position: 11
    },
    {
      Description: 'YOU HAVE BEEN ELECTED CHAIRMAN OF THE BOARD. PAY EACH PLAYER $50.',
      Special: 'PAY_50_EVERYONE'
    },
    {
      Description: 'ADVANCE TOKEN TO THE NEAREST RAILROAD AND PAY OWNER TWICE THE RENTAL TO WHICH HE IS OTHERWISE ENTITLED. IF RAILROAD IS UNOWNED, YOU MAY BUY IT FROM THE BANK.',
      Special: 'RAILROAD'
    },
    {
      Description: 'TAKE A RIDE ON THE READING. IF YOU PASS GO COLLECT $200',
      Position: 5
    },
    {
      Description: 'ADVANCE TOKEN TO THE NEAREST RAILROAD AND PAY OWNER TWICE THE RENTAL TO WHICH HE IS OTHERWISE ENTITLED. IF RAILROAD IS UNOWNED, YOU MAY BUY IT FROM THE BANK.',
      Special: 'RAILROAD'
    },
    {
      Description: 'TAKE A WALK ON THE BOARD WALK. ADVANCE TOKEN TO BOARD WALK',
      Position: 39
    },
    {
      Description: 'YOUR BUILDING AND LOAN MATURES. COLLECT $150',
      Cash: 150
    },
    {
      Description: 'ADVANCE TO ILLINOIS AVE',
      Position: 24
    },
    {
      Description: 'MAKE GENERAL REPAIRS ON ALL YOUR PROPERTY. FOR EACH HOUSE PAY $25. FOR EACH HOTEL PAY $100.',
      House: -25,
      Hotel: -100
    },
    {
      Description: 'GET OUT OF JAIL FREE',
      Special: 'JAIL_FREE'
    }
  ],
  Properties: [
    {
      NAME: 'Atlantic Avenue',
      PROPERTY_GROUP: 'Yellow',
      ALLOWS_HOUSES: true,
      BOARD_POSITION: 26,
      PRICE: 260,
      RENT: [22, 110, 330, 800, 975, 1150],
      HOUSE_PRICE: 150,
      MORTGAGE_PRICE: 130,
      HOUSE_SALE_PRICE: 75,
      UNMORTGAGE_PRICE: 143,
      NUMBER_OF_PROPERTIES_IN_GROUP: 3
    },
    {
      NAME: 'B & O Railroad',
      PROPERTY_GROUP: 'Stations',
      ALLOWS_HOUSES: false,
      BOARD_POSITION: 25,
      PRICE: 200,
      RENT: [25, 50, 100, 200],
      HOUSE_PRICE: 0,
      MORTGAGE_PRICE: 100,
      HOUSE_SALE_PRICE: 0,
      UNMORTGAGE_PRICE: 110,
      NUMBER_OF_PROPERTIES_IN_GROUP: 4
    },
    {
      NAME: 'Baltic Avenue',
      PROPERTY_GROUP: 'Brown',
      ALLOWS_HOUSES: true,
      BOARD_POSITION: 3,
      PRICE: 60,
      RENT: [4, 20, 60, 180, 320, 450],
      HOUSE_PRICE: 50,
      MORTGAGE_PRICE: 30,
      HOUSE_SALE_PRICE: 25,
      UNMORTGAGE_PRICE: 33,
      NUMBER_OF_PROPERTIES_IN_GROUP: 2
    },
    {
      NAME: 'Boardwalk',
      PROPERTY_GROUP: 'DarkBlue',
      ALLOWS_HOUSES: true,
      BOARD_POSITION: 39,
      PRICE: 400,
      RENT: [50, 200, 600, 1400, 1700, 2000],
      HOUSE_PRICE: 200,
      MORTGAGE_PRICE: 200,
      HOUSE_SALE_PRICE: 100,
      UNMORTGAGE_PRICE: 220,
      NUMBER_OF_PROPERTIES_IN_GROUP: 2
    },
    {
      NAME: 'Connecticut Avenue',
      PROPERTY_GROUP: 'LightBlue',
      ALLOWS_HOUSES: true,
      BOARD_POSITION: 9,
      PRICE: 120,
      RENT: [8, 40, 100, 300, 450, 600],
      HOUSE_PRICE: 50,
      MORTGAGE_PRICE: 60,
      HOUSE_SALE_PRICE: 25,
      UNMORTGAGE_PRICE: 66,
      NUMBER_OF_PROPERTIES_IN_GROUP: 3
    },
    {
      NAME: 'Electric Company',
      PROPERTY_GROUP: 'Utilities',
      ALLOWS_HOUSES: false,
      BOARD_POSITION: 12,
      PRICE: 150,
      RENT: [4, 10],
      HOUSE_PRICE: 0,
      MORTGAGE_PRICE: 75,
      HOUSE_SALE_PRICE: 0,
      UNMORTGAGE_PRICE: 82,
      NUMBER_OF_PROPERTIES_IN_GROUP: 2
    },
    {
      NAME: 'Illinois Avenue',
      PROPERTY_GROUP: 'Red',
      ALLOWS_HOUSES: true,
      BOARD_POSITION: 24,
      PRICE: 240,
      RENT: [20, 100, 300, 750, 925, 1100],
      HOUSE_PRICE: 150,
      MORTGAGE_PRICE: 120,
      HOUSE_SALE_PRICE: 75,
      UNMORTGAGE_PRICE: 132,
      NUMBER_OF_PROPERTIES_IN_GROUP: 3
    },
    {
      NAME: 'Indiana Avenue',
      PROPERTY_GROUP: 'Red',
      ALLOWS_HOUSES: true,
      BOARD_POSITION: 23,
      PRICE: 220,
      RENT: [18, 90, 250, 700, 875, 1050],
      HOUSE_PRICE: 150,
      MORTGAGE_PRICE: 110,
      HOUSE_SALE_PRICE: 75,
      UNMORTGAGE_PRICE: 121,
      NUMBER_OF_PROPERTIES_IN_GROUP: 3
    },
    {
      NAME: 'Kentucky Avenue',
      PROPERTY_GROUP: 'Red',
      ALLOWS_HOUSES: true,
      BOARD_POSITION: 21,
      PRICE: 220,
      RENT: [18, 90, 250, 700, 875, 1050],
      HOUSE_PRICE: 150,
      MORTGAGE_PRICE: 110,
      HOUSE_SALE_PRICE: 75,
      UNMORTGAGE_PRICE: 121,
      NUMBER_OF_PROPERTIES_IN_GROUP: 3
    },
    {
      NAME: 'Marvin Gardens',
      PROPERTY_GROUP: 'Yellow',
      ALLOWS_HOUSES: true,
      BOARD_POSITION: 29,
      PRICE: 280,
      RENT: [24, 120, 360, 850, 1025, 1200],
      HOUSE_PRICE: 150,
      MORTGAGE_PRICE: 140,
      HOUSE_SALE_PRICE: 75,
      UNMORTGAGE_PRICE: 154,
      NUMBER_OF_PROPERTIES_IN_GROUP: 3
    },
    {
      NAME: 'Mediterranean Avenue',
      PROPERTY_GROUP: 'Brown',
      ALLOWS_HOUSES: true,
      BOARD_POSITION: 1,
      PRICE: 60,
      RENT: [2, 10, 30, 90, 160, 250],
      HOUSE_PRICE: 50,
      MORTGAGE_PRICE: 30,
      HOUSE_SALE_PRICE: 25,
      UNMORTGAGE_PRICE: 33,
      NUMBER_OF_PROPERTIES_IN_GROUP: 2
    },
    {
      NAME: 'New York Avenue',
      PROPERTY_GROUP: 'Orange',
      ALLOWS_HOUSES: true,
      BOARD_POSITION: 19,
      PRICE: 200,
      RENT: [16, 80, 220, 600, 800, 1000],
      HOUSE_PRICE: 100,
      MORTGAGE_PRICE: 100,
      HOUSE_SALE_PRICE: 50,
      UNMORTGAGE_PRICE: 110,
      NUMBER_OF_PROPERTIES_IN_GROUP: 3
    },
    {
      NAME: 'North Carolina Avenue',
      PROPERTY_GROUP: 'Green',
      ALLOWS_HOUSES: true,
      BOARD_POSITION: 32,
      PRICE: 300,
      RENT: [26, 130, 390, 900, 1100, 1275],
      HOUSE_PRICE: 200,
      MORTGAGE_PRICE: 150,
      HOUSE_SALE_PRICE: 100,
      UNMORTGAGE_PRICE: 165,
      NUMBER_OF_PROPERTIES_IN_GROUP: 3
    },
    {
      NAME: 'Oriental Avenue',
      PROPERTY_GROUP: 'LightBlue',
      ALLOWS_HOUSES: true,
      BOARD_POSITION: 6,
      PRICE: 100,
      RENT: [6, 30, 90, 270, 400, 550],
      HOUSE_PRICE: 50,
      MORTGAGE_PRICE: 50,
      HOUSE_SALE_PRICE: 25,
      UNMORTGAGE_PRICE: 65,
      NUMBER_OF_PROPERTIES_IN_GROUP: 3
    },
    {
      NAME: 'Pacific Avenue',
      PROPERTY_GROUP: 'Green',
      ALLOWS_HOUSES: true,
      BOARD_POSITION: 31,
      PRICE: 300,
      RENT: [26, 130, 390, 900, 1100, 1275],
      HOUSE_PRICE: 200,
      MORTGAGE_PRICE: 150,
      HOUSE_SALE_PRICE: 100,
      UNMORTGAGE_PRICE: 165,
      NUMBER_OF_PROPERTIES_IN_GROUP: 3
    },
    {
      NAME: 'Park Place',
      PROPERTY_GROUP: 'DarkBlue',
      ALLOWS_HOUSES: true,
      BOARD_POSITION: 37,
      PRICE: 350,
      RENT: [35, 175, 500, 1100, 1300, 1500],
      HOUSE_PRICE: 200,
      MORTGAGE_PRICE: 175,
      HOUSE_SALE_PRICE: 100,
      UNMORTGAGE_PRICE: 192,
      NUMBER_OF_PROPERTIES_IN_GROUP: 2
    },
    {
      NAME: 'Pennsylvania Avenue',
      PROPERTY_GROUP: 'Green',
      ALLOWS_HOUSES: true,
      BOARD_POSITION: 34,
      PRICE: 320,
      RENT: [28, 150, 450, 1000, 1200, 1400],
      HOUSE_PRICE: 200,
      MORTGAGE_PRICE: 160,
      HOUSE_SALE_PRICE: 100,
      UNMORTGAGE_PRICE: 176,
      NUMBER_OF_PROPERTIES_IN_GROUP: 3
    },
    {
      NAME: 'Pennsylvania Railroad',
      PROPERTY_GROUP: 'Stations',
      ALLOWS_HOUSES: false,
      BOARD_POSITION: 15,
      PRICE: 200,
      RENT: [25, 50, 100, 200],
      HOUSE_PRICE: 0,
      MORTGAGE_PRICE: 100,
      HOUSE_SALE_PRICE: 0,
      UNMORTGAGE_PRICE: 110,
      NUMBER_OF_PROPERTIES_IN_GROUP: 4
    },
    {
      NAME: 'Reading Railroad',
      PROPERTY_GROUP: 'Stations',
      ALLOWS_HOUSES: false,
      BOARD_POSITION: 5,
      PRICE: 200,
      RENT: [25, 50, 100, 200],
      HOUSE_PRICE: 0,
      MORTGAGE_PRICE: 100,
      HOUSE_SALE_PRICE: 0,
      UNMORTGAGE_PRICE: 110,
      NUMBER_OF_PROPERTIES_IN_GROUP: 4
    },
    {
      NAME: 'Short Line',
      PROPERTY_GROUP: 'Stations',
      ALLOWS_HOUSES: false,
      BOARD_POSITION: 35,
      PRICE: 200,
      RENT: [25, 50, 100, 200],
      HOUSE_PRICE: 0,
      MORTGAGE_PRICE: 100,
      HOUSE_SALE_PRICE: 0,
      UNMORTGAGE_PRICE: 110,
      NUMBER_OF_PROPERTIES_IN_GROUP: 4
    },
    {
      NAME: 'St. Charles Place',
      PROPERTY_GROUP: 'Pink',
      ALLOWS_HOUSES: true,
      BOARD_POSITION: 11,
      PRICE: 140,
      RENT: [10, 50, 150, 450, 625, 750],
      HOUSE_PRICE: 100,
      MORTGAGE_PRICE: 70,
      HOUSE_SALE_PRICE: 50,
      UNMORTGAGE_PRICE: 77,
      NUMBER_OF_PROPERTIES_IN_GROUP: 3
    },
    {
      NAME: 'St. James Place',
      PROPERTY_GROUP: 'Orange',
      ALLOWS_HOUSES: true,
      BOARD_POSITION: 16,
      PRICE: 180,
      RENT: [14, 70, 200, 550, 750, 950],
      HOUSE_PRICE: 100,
      MORTGAGE_PRICE: 90,
      HOUSE_SALE_PRICE: 50,
      UNMORTGAGE_PRICE: 99,
      NUMBER_OF_PROPERTIES_IN_GROUP: 3
    },
    {
      NAME: 'States Avenue',
      PROPERTY_GROUP: 'Pink',
      ALLOWS_HOUSES: true,
      BOARD_POSITION: 13,
      PRICE: 140,
      RENT: [10, 50, 150, 450, 625, 750],
      HOUSE_PRICE: 100,
      MORTGAGE_PRICE: 70,
      HOUSE_SALE_PRICE: 50,
      UNMORTGAGE_PRICE: 77,
      NUMBER_OF_PROPERTIES_IN_GROUP: 3
    },
    {
      NAME: 'Tennessee Avenue',
      PROPERTY_GROUP: 'Orange',
      ALLOWS_HOUSES: true,
      BOARD_POSITION: 18,
      PRICE: 180,
      RENT: [14, 70, 200, 550, 750, 950],
      HOUSE_PRICE: 100,
      MORTGAGE_PRICE: 90,
      HOUSE_SALE_PRICE: 50,
      UNMORTGAGE_PRICE: 99,
      NUMBER_OF_PROPERTIES_IN_GROUP: 3
    },
    {
      NAME: 'Ventnor Avenue',
      PROPERTY_GROUP: 'Yellow',
      ALLOWS_HOUSES: true,
      BOARD_POSITION: 27,
      PRICE: 260,
      RENT: [22, 110, 330, 800, 975, 1150],
      HOUSE_PRICE: 150,
      MORTGAGE_PRICE: 130,
      HOUSE_SALE_PRICE: 75,
      UNMORTGAGE_PRICE: 143,
      NUMBER_OF_PROPERTIES_IN_GROUP: 3
    },
    {
      NAME: 'Vermont Avenue',
      PROPERTY_GROUP: 'LightBlue',
      ALLOWS_HOUSES: true,
      BOARD_POSITION: 8,
      PRICE: 100,
      RENT: [6, 30, 90, 270, 400, 550],
      HOUSE_PRICE: 50,
      MORTGAGE_PRICE: 50,
      HOUSE_SALE_PRICE: 25,
      UNMORTGAGE_PRICE: 55,
      NUMBER_OF_PROPERTIES_IN_GROUP: 3
    },
    {
      NAME: 'Virginia Avenue',
      PROPERTY_GROUP: 'Pink',
      ALLOWS_HOUSES: true,
      BOARD_POSITION: 14,
      PRICE: 160,
      RENT: [12, 60, 180, 500, 700, 900],
      HOUSE_PRICE: 100,
      MORTGAGE_PRICE: 80,
      HOUSE_SALE_PRICE: 50,
      UNMORTGAGE_PRICE: 88,
      NUMBER_OF_PROPERTIES_IN_GROUP: 3
    },
    {
      NAME: 'Water Works',
      PROPERTY_GROUP: 'Utilities',
      ALLOWS_HOUSES: false,
      BOARD_POSITION: 28,
      PRICE: 150,
      RENT: [4, 10],
      HOUSE_PRICE: 0,
      MORTGAGE_PRICE: 75,
      HOUSE_SALE_PRICE: 0,
      UNMORTGAGE_PRICE: 82,
      NUMBER_OF_PROPERTIES_IN_GROUP: 2
    }
  ],
  PositionType: ['GO', 'PROPERTY', 'COMMUNITY_CHEST', 'PROPERTY', 'INCOME_TAX', 'PROPERTY', 'PROPERTY', 'CHANCE', 'PROPERTY', 'PROPERTY',
    'JAIL', 'PROPERTY', 'PROPERTY', 'PROPERTY', 'PROPERTY', 'PROPERTY', 'PROPERTY', 'COMMUNITY_CHEST', 'PROPERTY', 'PROPERTY',
    'FREE_PARKING', 'PROPERTY', 'CHANCE', 'PROPERTY', 'PROPERTY', 'PROPERTY', 'PROPERTY', 'PROPERTY', 'PROPERTY', 'PROPERTY',
    'GO_TO_JAIL', 'PROPERTY', 'PROPERTY', 'COMMUNITY_CHEST', 'PROPERTY', 'PROPERTY', 'CHANCE', 'PROPERTY', 'LUXURY_TAX', 'PROPERTY'
  ]
}

export default rules
