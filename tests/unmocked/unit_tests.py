'''
unmocked_test.py
'''

import unittest
import os
import sys
import models

sys.path.append(os.path.abspath('../../'))
from app import add_player
import models

USERNAME_INPUT = "username"
USERS_INPUT = 'DATA'
EXPECTED_OUTPUT = "expected"

class appTestCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                USERNAME_INPUT: "jonathan",
                USERS_INPUT: {
                    'player_x': None,
                    'player_o': None,
                    'spectators': [],
                },
                EXPECTED_OUTPUT: {
                    'player_x': "jonathan",
                    'player_o': None,
                    'spectators': [],
                }
            }
        ]
        
        self.failure_test_params = [
            {
                USERNAME_INPUT: "jonathan",
                USERS_INPUT: {
                    'player_x': "jon",
                    'player_o': None,
                    'spectators': [],
                },
                EXPECTED_OUTPUT: {
                    'player_x': "jon",
                    'player_o': None,
                    'spectators': ["jonathan"],
                }
            }
        ]
    
    def test_success(self):
        for test in self.success_test_params:
            actual_result = add_player(test[USERNAME_INPUT], test[USERS_INPUT])
            expected_result = test[EXPECTED_OUTPUT]
            self.assertEqual(actual_result['player_x'], expected_result['player_x'])
            self.assertEqual(actual_result['player_o'], expected_result['player_o'])
            self.assertEqual(len(actual_result['spectators']), len(expected_result['spectators']))
        
    def test_failure(self):
        for test in self.failure_test_params:
            actual_result = add_player(test[USERNAME_INPUT], test[USERS_INPUT])
            
            expected_result = test[EXPECTED_OUTPUT]
            
            self.assertNotEqual(actual_result['player_x'], expected_result['player_x'])
            self.assertNotEqual(actual_result['player_o'], expected_result['player_o'])
            self.assertNotEqual(len(actual_result['spectators']), len(expected_result['spectators']))


if __name__ == '__main__':
    unittest.main()
