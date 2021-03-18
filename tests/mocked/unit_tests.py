'''
mocked_test.py
'''

import unittest
import unittest.mock as mock
from unittest.mock import patch
import os
import sys

sys.path.append(os.path.abspath('../../'))
import models

KEY_INPUT = "input"
KEY_EXPECTED = "expected"

INITIAL_USERNAME = "user1"
INITIAL_SCORE = 100

class appTestCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                KEY_INPUT: 'jonathan',
                KEY_EXPECTED: [INITIAL_USERNAME, 'jonathan'],
            }, 
            {
                KEY_INPUT: 'user1',
                KEY_EXPECTED: [INITIAL_USERNAME],
            },
            # TODO add another
        ]
        
        # self.failure_test_params = [
        # ]
        initial_player = models.Player(username=INITIAL_USERNAME, ranking=INITIAL_SCORE)
        self.initial_db_mock = [initial_person]
        
    def mocked_db_session_add(self, username):
        self.inital_db_mock.append(username)
    
    def mocked_db_session_commit(self):
        pass
    
    def mocked_player_query_all(self):
        return self.initial_db_mock
    
    def mocked_add_to_dict(self):
        pass
    
    def test_success(self):
        for test in self.success_test_params:
            with patch('app.db.session.add', self.mocked_db_session_add):
                with patch('app.db.session.commit', self.mocked_db_session_commit):
                    with patch('models.Player.query') as mocked_query:
                        mocked_query.all = self.mocked_player_query_all
                        
                        print(self.initial_db_mock)
                        # actual_result = test[KEY_INPUT]
                        # expected_result = test[KEY_EXPECTED]
                        # self.assertEqual(actual_result[1], expected_result[1])
        
    # def test_failure(self):
    #     self.assertEqual()


if __name__ == '__main__':
    unittest.main()
