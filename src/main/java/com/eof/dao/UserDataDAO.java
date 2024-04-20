package com.eof.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Calendar;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;

import com.eof.bo.UserDataBO;
import com.eof.dbconnection.DBConnection;


public class UserDataDAO {
	static Logger errorLog = Logger.getLogger("errorLogger"); 
	static Logger statusLog = Logger.getLogger("statusLogger");
	static Logger debugLog  = Logger.getLogger("debugLogger"); 
	
	/*
	 * Insert the User data
	 */
	
    public void insertData(UserDataBO userBO) throws SQLException {
        Connection con = null;
        PreparedStatement pstmt = null;
        PreparedStatement pstmt1 = null;
        ResultSet rSet = null;
        try {
        	con = new DBConnection().getConnection();
        	// QUERY FOR CHECK THE E-MAIL IS ALREAADY EXSIST OR NOT
        	String query1 = "SELECT email FROM eof.USER_DATA WHERE email = ? and is_delete = 0";
            pstmt = con.prepareStatement(query1);
            pstmt.setString(1, userBO.getEmail());
            rSet = pstmt.executeQuery();
            if(rSet.next()){
            	userBO.setResult("Email already exist");
            	statusLog.info("Email Already existed");
            }else{
            	// QUERY FOR TO INSERT THE NEW USER INTO THE TABLE
            	String query2 = "INSERT INTO eof.USER_DATA(name, age, gender, email, phone_number, likes, password) VALUES(?,?,?,?,?,?,?);";
 	        	pstmt1 = con.prepareStatement(query2);
 	            pstmt1.setString(1, userBO.getUser_name());
 	            pstmt1.setInt(2, userBO.getAge());
 	            pstmt1.setString(3, userBO.getGender());
 	            pstmt1.setString(4, userBO.getEmail());
 	            pstmt1.setString(5, userBO.getPhone_number());
 	            pstmt1.setString(6, userBO.getLikes());
 	            pstmt1.setString(7, userBO.getPassword());
 	            int qryResult = pstmt1.executeUpdate();
 	            if (qryResult == 1) {
 	            	userBO.setResult("true");
 	            	statusLog.info("New User data inserted");
 	            }else{
 	            	userBO.setResult("Something went wrong");
 	            	statusLog.info("Something went wrong on inserting new user");
 	            }
             }
        }catch(Exception e) {
        	errorLog.error("Error Occur on insert new user into the table");
            e.printStackTrace();
        }finally {
        	if(rSet != null){
        		rSet.close();
        	}
        	if(con != null){
        		con.close(); 
            	debugLog.info("Connection Closed");
        	}
        	if(pstmt != null){
        		pstmt.close();
        	}
        	if(pstmt1 != null){
        		pstmt1.close();
        	}
        }
    }
    
    /*
     * Check the user credentials for login
     */
    
    public void validate(UserDataBO userBO) throws SQLException{
    	Connection con = null;
        PreparedStatement pstmt = null;
        ResultSet rSet = null;
        try {
        	con = new DBConnection().getConnection();
        	// QUERY FOR TO CHECK THE USER EMAIL AND PASSWORD IS MATCH OR NOT
            String query = "SELECT user_id,email,password,name,role FROM eof.USER_DATA WHERE email = ? and password = ? and is_delete = 0";
            pstmt = con.prepareStatement(query);
            pstmt.setString(1, userBO.getEmail());
            pstmt.setString(2, userBO.getPassword());
            rSet = pstmt.executeQuery();
            if(rSet.next()){
            	userBO.setUser_id(rSet.getInt("user_id"));
            	userBO.setUser_name(rSet.getString("name"));
            	userBO.setRole(rSet.getString("role"));
            	userBO.setResult("true");
            	statusLog.info("Valid User Conformed");
            }else{
            	userBO.setResult("invalid user");
            	statusLog.info("Invalid user login");
            }
        }catch(Exception e) {
        	errorLog.error("Error Occur on login validation");
            e.printStackTrace();
        }finally {
        	if(con != null){
        		con.close();
            	debugLog.info("Connection Closed");
        	}
        	if(pstmt != null){
        		pstmt.close();
        	}
        	if(rSet != null){
        		rSet.close();
        	}
        }
    	
    }
    
    /*
     * Get the user details
     */
    
    public JSONObject getUserDetails(UserDataBO userBO) throws SQLException{
    	JSONObject obj = new JSONObject();
    	Connection con = null;
        PreparedStatement pstmt = null;
        ResultSet rSet = null;
        try {
        	con = new DBConnection().getConnection();
        	// QUERY FOR TO GET THE USER DETAILS
            String query = "SELECT USR.user_id, name, age, email, gender, phone_number, likes, IFNULL(RESP.count, 0) AS count FROM eof.USER_DATA USR LEFT JOIN ( SELECT user_id, COUNT(recipe_id) AS count FROM EOF.RECIPE_MASTER WHERE is_delete = 0 GROUP BY user_id ) RESP ON RESP.user_id = USR.user_id WHERE USR.user_id = ? AND USR.is_delete = 0;";
            pstmt = con.prepareStatement(query);
            pstmt.setInt(1, userBO.getUser_id());
            rSet = pstmt.executeQuery();
            if(rSet.next()){ 
            	int columns = rSet.getMetaData().getColumnCount();
            	
				for (int i = 1; i <= columns; i++){
					obj.put(rSet.getMetaData().getColumnLabel(i).toLowerCase(), rSet.getObject(i)); 
				}
				
				userBO.setResult("true");
            	statusLog.info("User Data sended");
            }else{
            	userBO.setResult("invalid user");
            	statusLog.info("Invalid user ");
            }
        }catch(Exception e) {
        	errorLog.error("Error Occur on geting user data");
            e.printStackTrace();
        }finally {
        	if(con != null){
        		con.close();
            	debugLog.info("Connection Closed");
        	}
        	if(pstmt != null){
        		pstmt.close();
        	}
        	if(rSet != null){
        		rSet.close();
        	}
        }
    	return obj;
    }
    
    /*
     * Update the user details
     */
    
    public void updateUserDetails(UserDataBO userBO) throws SQLException{
    	Connection con = null;
        PreparedStatement pstmt = null;
        PreparedStatement pstmt1 = null;
        ResultSet rSet = null;
        try {
        	con = new DBConnection().getConnection();
        	Calendar cal = Calendar.getInstance();  
        	java.sql.Timestamp timestamp = new java.sql.Timestamp(cal.getTimeInMillis());
        	// QUERY TO CHECK THE PASSWORD IS MATCH OR NOT
        	String query = "SELECT user_id FROM eof.USER_DATA WHERE user_id = ? and password = ? and is_delete = 0";
            pstmt = con.prepareStatement(query);
            pstmt.setInt(1, userBO.getUser_id());
            pstmt.setString(2, userBO.getPassword());
            rSet = pstmt.executeQuery();
            if(rSet.next()){
            	// QUERY FOR TO UPDATE THE USER DETAILS
            	String qry = "UPDATE eof.USER_DATA SET name = ?, age = ?, gender = ?, email = ?, phone_number = ?, likes = ?, updated_at = ?";
            	if(userBO.getNewpassAvl() == 1){
            		qry += ", password = ?";
            	}
            	qry += " WHERE user_id = ?";
 	        	pstmt1 = con.prepareStatement(qry);
 	        	int pos = 1;
 	            pstmt1.setString(pos++, userBO.getUser_name());
 	            pstmt1.setInt(pos++, userBO.getAge());
 	            pstmt1.setString(pos++, userBO.getGender());
 	            pstmt1.setString(pos++, userBO.getEmail());
 	            pstmt1.setString(pos++, userBO.getPhone_number());
 	            pstmt1.setString(pos++, userBO.getLikes());
 	            pstmt1.setTimestamp(pos++, timestamp);
 	           if(userBO.getNewpassAvl() == 1){
 	        	  pstmt1.setString(pos++, userBO.getNewpassword());
 	           }
 	           pstmt1.setInt(pos++, userBO.getUser_id());
 	           int qryResult = pstmt1.executeUpdate();
	           if (qryResult > 0) {
		           userBO.setResult("true");
		           statusLog.info("User data Updated");
	           }else{
		           userBO.setResult("Something went wrong");
		           statusLog.info("Something went wrong on updating user details");
	           }
            }else{
            	userBO.setResult("Incorrect password");
            	statusLog.info("Incorrect password");
            }
        }catch(Exception e) {
        	errorLog.error("Error Occur on update user details into the table");
            e.printStackTrace();
        }finally {
        	if(rSet != null){
        		rSet.close();
        	}
        	if(con != null){
        		con.close();
            	debugLog.info("Connection Closed");
        	}
        	if(pstmt != null){
        		pstmt.close();
        	}
        	if(pstmt1 != null){
        		pstmt1.close();
        	}
        }
    }
    
    /*
     * Get all user details with their recipe counts
     */
    
    public JSONArray getUsers() throws SQLException{
    	Connection con = null;
        PreparedStatement pstmt = null;
        ResultSet rSet = null;
		JSONArray arr = new JSONArray();
		try {
        	con = new DBConnection().getConnection();
        	// QUERY FOR TO GET ALL ACTIVE USER
            String query = "SELECT USR.user_id, USR.name, USR.age, USR.email, USR.gender, USR.phone_number, USR.likes, IFNULL(RESP.count, 0) AS count FROM eof.USER_DATA USR LEFT JOIN ( SELECT user_id, COUNT(recipe_id) AS count FROM eof.RECIPE_MASTER WHERE is_delete = 0 GROUP BY user_id ) RESP ON RESP.user_id = USR.user_id WHERE USR.role = 'user' AND USR.is_delete = 0;";
            pstmt = con.prepareStatement(query);
            rSet = pstmt.executeQuery();
            while (rSet.next()) { 
            	
				//GET COLUMN COUNT FOR ITERATION
				int columns = rSet.getMetaData().getColumnCount(); 
				
				JSONObject obj = new JSONObject(); 
				for (int i = 1; i <= columns; i++){
					obj.put(rSet.getMetaData().getColumnLabel(i).toLowerCase(), rSet.getObject(i)); 
				}
				// INSERT JSON OBJECT INTO JSON THE ARRAY
				arr.put(obj);
			}
		}catch(Exception e) {
			errorLog.error("Error Occur on get top 8 recipes from the table");
            e.printStackTrace();
        }finally {
        	if(rSet != null){
        		rSet.close();
        	}
        	if(con != null){
        		con.close();
            	debugLog.info("Connection Closed");
        	}
        	if(pstmt != null){
        		pstmt.close();
        	}
        }
		return arr;
    }
    
    /*
     * Get both recipes and users counts 
     */
    
    public JSONObject getCounts() throws SQLException{
    	Connection con = null;
        PreparedStatement pstmt = null;
        PreparedStatement pstmt1 = null;
        ResultSet rSet = null;
        ResultSet rSet1 = null;
        JSONObject obj = new JSONObject();
        try {
        	con = new DBConnection().getConnection();
        	StringBuilder query = new StringBuilder();
        	// QUERY TO GET No Of USERS COUNT
        	query.append("SELECT COUNT(user_id) as user_count FROM eof.USER_DATA WHERE is_delete = 0 and role = 'user'");
            pstmt = con.prepareStatement(query.toString());
            rSet = pstmt.executeQuery();
            
            while(rSet.next()){
            	obj.put("user_count", rSet.getInt("user_count"));
            }
            
            // QUERY TO GET No Of RECIPES COUNT
            String qry = "SELECT COUNT(recipe_id) as recipe_count FROM eof.RECIPE_MASTER WHERE is_delete = 0";
            pstmt1 = con.prepareStatement(qry);
            rSet1 = pstmt1.executeQuery();
            
            while(rSet1.next()){
            	obj.put("recipe_count", rSet1.getInt("recipe_count"));
            }
            
        }catch(Exception e) {
        	errorLog.error("Error Occur on insert the recipe data into the table");
            e.printStackTrace();
        }finally {
        	if(con != null){
        		con.close();
            	debugLog.info("Connection Closed");
        	}
        	if(pstmt != null){
        		pstmt.close();
        	}
        	if(pstmt1 != null){
        		pstmt1.close();
        	}
        	if(rSet != null){
        		rSet.close();
        	}
        	if(rSet1 != null){
        		rSet1.close();
        	}
        }
        return obj;
    }
    
    /*
     * Delete the user
     */
    
    public void deleteUser(UserDataBO userBO) throws SQLException{
    	Connection con = null;
        PreparedStatement pstmt = null;
        try {
        	con = new DBConnection().getConnection();
        	StringBuilder query = new StringBuilder();
        	// QUERY FOR TO DELETE THE USER FROM THE TABLE
        	query.append("UPDATE eof.USER_DATA SET is_delete = 1");
            query.append(" WHERE user_id = ?");
            pstmt = con.prepareStatement(query.toString());
            pstmt.setInt(1, userBO.getUser_id());
            int r = pstmt.executeUpdate();
            if (r==1) {
            	userBO.setResult("true");
            	statusLog.info("User data deleted");
            }else {
            	userBO.setResult("Something went wrong!, user not deleted");
            	statusLog.info("User data not deleted");
            }
            
        }catch(Exception e) {
        	errorLog.error("Error Occur on delete the user data from the table");
            e.printStackTrace();
        }finally {
        	if(con != null){
        		con.close();
            	debugLog.info("Connection Closed");
        	}
        	if(pstmt != null){
        		pstmt.close();
        	}
        }
    }
    
}