import React from 'react';

function ChangePassword() {

        return (
            <div className="profileLayoutBody">
              <div className="updateUserWrapper">
                <div className="updateUserHeader">
                    <button type="button" name="button">
                        <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-chevron-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                        </svg>
                    </button>
                    <h2>Change Password</h2>
                </div>
                <div className="updateUserformBody">
                            <form id="changePassword">
                                <table>
                                  <tbody>
                                    <tr>
                                        <th>Current Password</th>
                                    </tr>
                                    <tr>
                                        <td><input type="text" required /></td>
                                    </tr>
                                    <tr>
                                        <th>New Password</th>
                                    </tr>
                                    <tr>
                                        <td><input type="text" /></td>
                                    </tr>
                                    <tr>
                                        <th>Confirm Password</th>
                                    </tr>
                                    <tr>
                                        <td><input type="text" /></td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2"><input type="submit" value="Submit" /></td>
                                    </tr>
                                  </tbody>
                                </table>
                            </form>
                        </div>
              </div>
            </div>
        );
}

export default ChangePassword;