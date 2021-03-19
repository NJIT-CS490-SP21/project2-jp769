'''
unmocked_test.py
'''

import unittest
import os
import sys
sys.path.append(os.path.dirname(os.path.abspath('../../')))

from app import *

USERNAME_INPUT = "username"
USERS_INPUT = 'DATA'
EXPECTED_OUTPUT = "expected"


class appTestCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [{
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
        }, {
            USERNAME_INPUT: "Jon",
            USERS_INPUT: {
                'player_x': "Jonathan",
                'player_o': None,
                'spectators': [],
            },
            EXPECTED_OUTPUT: {
                'player_x': "Jonathan",
                'player_o': 'Jon',
                'spectators': [],
            }
        }, {
            USERNAME_INPUT: "Jon2",
            USERS_INPUT: {
                'player_x': "Jonathan",
                'player_o': "Jon",
                'spectators': [],
            },
            EXPECTED_OUTPUT: {
                'player_x': "Jonathan",
                'player_o': "Jon",
                'spectators': ["Jon2"],
            }
        }]

    def test_success(self):
        for test in self.success_test_params:
            actual_result = add_player(test[USERNAME_INPUT], test[USERS_INPUT])
            expected_result = test[EXPECTED_OUTPUT]
            self.assertEqual(actual_result['player_x'],
                             expected_result['player_x'])
            self.assertEqual(actual_result['player_o'],
                             expected_result['player_o'])
            self.assertEqual(len(actual_result['spectators']),
                             len(expected_result['spectators']))


if __name__ == '__main__':
    unittest.main()
