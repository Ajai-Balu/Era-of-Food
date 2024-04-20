package com.eof.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Calendar;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;

import com.eof.bo.RecipeBO;
import com.eof.dbconnection.DBConnection;

public class RecipeDAO {
	static Logger statusLog = Logger.getLogger("statusLogger");
	static Logger errorLog = Logger.getLogger("errorLogger"); 
	static Logger debugLog  = Logger.getLogger("debugLogger"); 
	
	/*
	 * Insert the recipe details 
	 */
	
	public void recipeData(RecipeBO recipeBO) throws SQLException {
		Connection con = null;
        PreparedStatement pstmt = null;
        PreparedStatement pstmt1 = null;
        ResultSet rSet1 = null;
        ResultSet rSet2 = null;
        try {
        	con = new DBConnection().getConnection();
        	// QUERY FOR CHECK THE RECIPE IS ALREAADY EXSIST OR NOT
        	String qry = "SELECT recipe_id FROM EOF.RECIPE_MASTER WHERE title = ? and category = ? and dish = ? and cuisine = ? and is_delete = 0";
            pstmt = con.prepareStatement(qry);
            pstmt.setString(1, recipeBO.getTitle());
            pstmt.setString(2, recipeBO.getCategory());
            pstmt.setString(3, recipeBO.getDish());
            pstmt.setString(4, recipeBO.getCuisine());
            rSet1 = pstmt.executeQuery();
            if(rSet1.next()){
            	recipeBO.setResult("Recipe Already exist");
            }else{
            	// QUERY FOR TO INSERT NEW RECIPE INTO THE TABLE
	            String query = "INSERT INTO eof.RECIPE_MASTER(title,user_id, category, dish, cuisine, prepare_time, cooking_time, total_time, yield, about, ingredients, instructions, img) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)";
	            pstmt1 = con.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);
	            pstmt1.setString(1, recipeBO.getTitle());
	            pstmt1.setInt(2, recipeBO.getUserId());
	            pstmt1.setString(3, recipeBO.getCategory());
	            pstmt1.setString(4, recipeBO.getDish());
	            pstmt1.setString(5, recipeBO.getCuisine());
	            pstmt1.setInt(6, recipeBO.getPrepareTime());
	            pstmt1.setInt(7, recipeBO.getCookingTime());
	            pstmt1.setInt(8, recipeBO.getTotalTime());
	            pstmt1.setString(9, recipeBO.getYield());
	            pstmt1.setString(10, recipeBO.getAbout());
	            pstmt1.setString(11, recipeBO.getIngredients());
	            pstmt1.setString(12, recipeBO.getInstruction());
	            pstmt1.setString(13, recipeBO.getImgData());
	            int result = pstmt1.executeUpdate();
	            if(result > 0){
	            	recipeBO.setResult("true");
	            }
            }
        }catch(Exception e) {
        	errorLog.error("Error Occur on insert the new recipe data into the table");
            e.printStackTrace();
        }finally {
        	if(rSet1 != null){
        		rSet1.close();
        	}
        	if(rSet2 != null){
        		rSet2.close();
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
	 * Get 8 top rated recipes
	 */
	
	public JSONArray getTopRecipes() throws SQLException{
		Connection con = null;
        PreparedStatement pstmt = null;
        ResultSet rSet = null;
        StringBuilder query = new StringBuilder();
		JSONArray arr = new JSONArray();
		try {
        	con = new DBConnection().getConnection();
        	// QUERY FOR TO GET TOP 8 RECIPES BASED ON RATING
        	query.append("SELECT title, img, RESP.recipe_id, IFNULL(RAT.count, 0) AS count, IFNULL(RAT.avg, 0) AS avg FROM eof.RECIPE_MASTER RESP LEFT JOIN ( SELECT recipe_id, COUNT(rating) AS count, AVG(rating) AS avg FROM eof.RECIPE_RATING WHERE is_delete = 0 GROUP BY recipe_id ) RAT ON RAT.recipe_id = RESP.recipe_id WHERE is_delete = 0 ORDER BY avg DESC, count DESC LIMIT 8;");
            pstmt = con.prepareStatement(query.toString());
            rSet = pstmt.executeQuery();
            while(rSet.next()){
            	JSONObject obj = new JSONObject();
            	obj.put("title", rSet.getString("title"));
            	obj.put("img", rSet.getString("img"));
            	obj.put("recipe_id", rSet.getInt("recipe_id"));
            	obj.put("rating_count", rSet.getInt("count"));
            	obj.put("rating", rSet.getInt("avg"));
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
	 * Get the particular user recipes
	 */
	
	public JSONArray getMyRecipes(int id) throws SQLException{
		Connection con = null;
        PreparedStatement pstmt = null;
        ResultSet rSet = null;
		JSONArray arr = new JSONArray();
		try {
        	con = new DBConnection().getConnection();
        	// QUERY FOR TO GET USER POSTED RECIPES
            String query = "SELECT recipe_id,title,category,cuisine,yield,dish,prepare_time,cooking_time,total_time,about,instructions,ingredients,img,user_id FROM EOF.RECIPE_MASTER WHERE user_id = ? and is_delete = 0";
            pstmt = con.prepareStatement(query);
            pstmt.setInt(1, id);
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
			errorLog.error("Error Occur on get user recipes from the table");
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
	 * Get the recipe details
	 */
	
	public JSONObject getRecipeDetails(int recipeId) throws SQLException{
		Connection con = null;
        PreparedStatement pstmt = null;
        ResultSet rSet = null;
        JSONObject obj = new JSONObject(); 
        StringBuilder query = new StringBuilder();
		try {
        	con = new DBConnection().getConnection();
        	// QUERY FOR GET THE SPECIFIC RECIPE FULL DETAILS
        	query.append("SELECT RESP.recipe_id, RESP.user_id, title, category, dish, cuisine, prepare_time, cooking_time, total_time, ingredients, instructions, yield, about, img, USR.name, IFNULL(RAT.count, 0) AS count, IFNULL(RAT.avg, 0) AS avg FROM EOF.RECIPE_MASTER RESP LEFT JOIN EOF.USER_DATA USR ON RESP.user_id = USR.user_id LEFT JOIN ( SELECT AVG(rating) AS avg, COUNT(rating) AS count, recipe_id FROM eof.RECIPE_RATING WHERE is_delete = 0 GROUP BY recipe_id ) RAT ON RESP.recipe_id = RAT.recipe_id WHERE RESP.is_delete = 0 AND RESP.recipe_id = ?;");
            pstmt = con.prepareStatement(query.toString());
            pstmt.setInt(1, recipeId);
            rSet = pstmt.executeQuery();
            while (rSet.next()) { 
                obj.put("user_name", rSet.getString("name"));
            	obj.put("rating_count", rSet.getInt("count"));
            	obj.put("rating", rSet.getString("avg"));
				//GET COLUMN COUNT FOR ITERATION
				int columns = rSet.getMetaData().getColumnCount();
				for (int i = 1; i <= columns; i++){
					obj.put(rSet.getMetaData().getColumnLabel(i).toLowerCase(), rSet.getObject(i)); 
				}
			}
            obj.put("status","true");
        }catch(Exception e) {
			errorLog.error("Error Occur on get recipes details from the table");
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
		
		return obj;
    }
	
	/*
	 * Update the recipe details
	 */
	
	public void updateRecipeData(RecipeBO recipeBO) throws SQLException{

		Connection con = null;
        PreparedStatement pstmt = null;
        try {
        	con = new DBConnection().getConnection();
        	StringBuilder query = new StringBuilder();
        	Calendar cal = Calendar.getInstance();  
        	java.sql.Timestamp timestamp = new java.sql.Timestamp(cal.getTimeInMillis());
        	// QUERY FOR TO UPDATE THE RECIPE DETAILS
            query.append("UPDATE eof.RECIPE_MASTER SET title = ?, category = ?, dish = ?, cuisine = ?, prepare_time = ?, cooking_time = ?, total_time = ?, yield = ?, about = ?, ingredients = ?, instructions = ? , updated_at = ?");
            if(recipeBO.getImg_avl()==1){
            	query.append(", img = ?");
            }else{
            	query.append("");
            }
            query.append(" WHERE recipe_id = ?");
            pstmt = con.prepareStatement(query.toString());
            int pos = 1;
            pstmt.setString(pos++, recipeBO.getTitle());
            pstmt.setString(pos++, recipeBO.getCategory());
            pstmt.setString(pos++, recipeBO.getDish());
            pstmt.setString(pos++, recipeBO.getCuisine());
            pstmt.setInt(pos++, recipeBO.getPrepareTime());
            pstmt.setInt(pos++, recipeBO.getCookingTime());
            pstmt.setInt(pos++, recipeBO.getTotalTime());
            pstmt.setString(pos++, recipeBO.getYield());
            pstmt.setString(pos++, recipeBO.getAbout());
            pstmt.setString(pos++, recipeBO.getIngredients());
            pstmt.setString(pos++, recipeBO.getInstruction());
            pstmt.setTimestamp(pos++, timestamp);
            if(recipeBO.getImg_avl()==1){
            	pstmt.setString(pos++, recipeBO.getImgData());
            }
            pstmt.setInt(pos++, recipeBO.getRecipe_id());
            int r = pstmt.executeUpdate();
            if (r > 0) {
            	recipeBO.setResult("true");
            	statusLog.info("Recipe data updated");
            }else {
            	recipeBO.setResult("Something went wrong!, Recipe not stored");
            	statusLog.info("Recipe data not updated");
            }
        }catch(Exception e) {
        	errorLog.error("Error Occur on update the recipe data into the table");
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
	
	/*
	 * Delete the recipe
	 */
	
	public void deleteRecipe(RecipeBO recipeBO) throws SQLException{
		Connection con = null;
        PreparedStatement pstmt = null;
        PreparedStatement pstmt1 = null;
        try {
        	con = new DBConnection().getConnection();
        	StringBuilder query = new StringBuilder();
        	// QUERY FOR DELETE THE RECIPE
        	query.append("UPDATE eof.RECIPE_MASTER SET is_delete = 1");
            query.append(" WHERE recipe_id = ?");
            pstmt = con.prepareStatement(query.toString());
            System.out.println(recipeBO.getRecipe_id());
            pstmt.setInt(1, recipeBO.getRecipe_id());
            int qryResult = pstmt.executeUpdate();
            if (qryResult > 0) {
            	// QUERY FOR ALSO DELETE THE DELETED RECIPE RATING
            	String qry = "UPDATE eof.RECIPE_RATING SET is_delete = 1 WHERE recipe_id = ?";
            	pstmt1 = con.prepareStatement(qry);
                pstmt1.setInt(1, recipeBO.getRecipe_id());
                int result = pstmt1.executeUpdate();
                System.out.println(result);
                if(result > 0){
                	
                	statusLog.info("Recipe data deleted");
                }else {
                	recipeBO.setResult("Something went wrong!, Recipe not deleted");
                }
                recipeBO.setResult("true");
            }else {
            	recipeBO.setResult("Something went wrong!, Recipe not deleted");
            }
        }catch(Exception e) {
        	errorLog.error("Error Occur on delete the recipe data from the table");
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
        }
	}
	
	/*
	 * Get the recipes list
	 */
	
	public JSONArray getRecipesList(String category, String list) throws SQLException{
		Connection con = null;
        PreparedStatement pstmt = null;
        ResultSet rSet = null;
		JSONArray arr = new JSONArray();
		StringBuilder query = new StringBuilder();
		try {
        	con = new DBConnection().getConnection();
        	// QUERY FOR GET THE RECIPE LIST 
        	query.append("SELECT title, img, RESP.recipe_id, IFNULL(count, 0) AS count, IFNULL(avg, 0) AS avg FROM EOF.RECIPE_MASTER RESP LEFT JOIN ( SELECT recipe_id, AVG(rating) AS avg, COUNT(rating) AS count FROM eof.RECIPE_RATING WHERE is_delete = 0 GROUP BY recipe_id ) RAT ON RESP.recipe_id = RAT.recipe_id WHERE RESP.is_delete = 0 ");
        	if(!list.equals("All")){
	        	if(category.equals("Recipes")){
	    			query.append("and dish = ? ");
	    		}else if(category.equals("Cuisine")){
	    			query.append("and cuisine = ?");
	    		}else if(category.equals("Category")){
	    			query.append("and category = ?");
	    		}
        	}
            pstmt = con.prepareStatement(query.toString());
            System.out.println(list);
            if(!list.equals("All")){
        		pstmt.setString(1, list);
        	}
            rSet = pstmt.executeQuery();
            while(rSet.next()){
            	JSONObject obj = new JSONObject();
            	obj.put("title", rSet.getString("title"));
            	obj.put("img", rSet.getString("img"));
            	obj.put("recipe_id", rSet.getInt("recipe_id"));
            	obj.put("rating_count", rSet.getInt("count"));
            	obj.put("rating", rSet.getInt("avg"));
            	arr.put(obj);
            }
		}catch(Exception e) {
			errorLog.error("Error Occur on get recipes list from the table");
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
	 * Add recipe comments 
	 */
	
	public RecipeBO addComment(RecipeBO recipeBO) throws SQLException{
		
		Connection con = null;
        PreparedStatement pstmt = null;
        PreparedStatement pstmt1 = null;
        ResultSet rSet = null;
        try {
        	con = new DBConnection().getConnection();
        	StringBuilder query = new StringBuilder();
        	// QUERY FOR TO CHECK THE USER ALREADY COMMENTED ON THAT RECIPE OR NOT
        	String query1 = "SELECT recipe_id,user_id FROM eof.RECIPE_CMD WHERE recipe_id = ? and user_id = ? and is_delete = 0";
            pstmt = con.prepareStatement(query1);
            pstmt.setInt(1, recipeBO.getRecipe_id());
            pstmt.setInt(2, recipeBO.getUserId());
            rSet = pstmt.executeQuery();
            if(rSet.next()){
            	recipeBO.setResult("You already commented on this recipe");
            	statusLog.info("You already commented on this recipe");
            }else{
            	// QUERY FOR TO INSERT COMMENTS INTO THE COMMENT TABLE
	        	query.append("INSERT INTO eof.RECIPE_CMD (recipe_id,user_id,comments)");
	            query.append(" VALUES(?,?,?);");
	            pstmt1 = con.prepareStatement(query.toString());
	            pstmt1.setInt(1, recipeBO.getRecipe_id());
	            pstmt1.setInt(2, recipeBO.getUserId());
	            pstmt1.setString(3, recipeBO.getComment());
	            int r = pstmt1.executeUpdate();
	            if (r==1) {
	            	recipeBO.setResult("true");
	            	statusLog.info("Comment added");
	            }else {
	            	recipeBO.setResult("Something went wrong!, comment not added");
	            	statusLog.info("Comment not added");
	            }
            }
        }catch(Exception e) {
        	errorLog.error("Error Occur on insert the comments into the table");
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
		return recipeBO;
	}
	
	/*
	 * Get the recipe comments
	 */
	
	public JSONArray getComments(int recipeID) throws SQLException{
		Connection con = null;
        PreparedStatement pstmt = null;
        ResultSet rSet = null;
		JSONArray arr = new JSONArray();
		StringBuilder query = new StringBuilder();
		try {
        	con = new DBConnection().getConnection();
        	// QUERY FOR GET THE RECIPES COMMENTS
            query.append("SELECT comments,USR.name,comment_id FROM EOF.RECIPE_CMD CMD left JOIN EOF.USER_DATA USR ON CMD.user_id = USR.user_id WHERE recipe_id = ? and CMD.is_delete = 0");
            pstmt = con.prepareStatement(query.toString());
            pstmt.setInt(1, recipeID);
            rSet = pstmt.executeQuery();
            while(rSet.next()){
            	JSONObject obj = new JSONObject();
                obj.put("user_name", rSet.getString("name"));
            	obj.put("comments", rSet.getString("comments"));
            	obj.put("comment_id", rSet.getInt("comment_id"));
            	arr.put(obj);
            }
		}catch(Exception e) {
			errorLog.error("Error Occur on get recipe comments from the table");
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
	 * Add rating for recipes
	 */
	
	public RecipeBO addRating(RecipeBO recipeBO) throws SQLException{
		Connection con = null;
        PreparedStatement pstmt = null;
        PreparedStatement pstmt1 = null;
        ResultSet rSet = null;
        try {
        	con = new DBConnection().getConnection();
        	StringBuilder query = new StringBuilder();
        	// QUERY FOR TO CHECK THE USER ALREADY GIVEN RATING ON THAT RECIPE OR NOT
        	String query1 = "SELECT recipe_id,user_id FROM eof.RECIPE_RATING WHERE recipe_id = ? and user_id = ? and is_delete = 0";
            pstmt = con.prepareStatement(query1);
            pstmt.setInt(1, recipeBO.getRecipe_id());
            pstmt.setInt(2, recipeBO.getUserId());
            rSet = pstmt.executeQuery();
            if(rSet.next()){
            	recipeBO.setResult("You already given Rating for this recipe");
            	statusLog.info("You already commented on this recipe");
            }else{
            	// QUERY FOR TO INSERT RATING INTO THE RATING TABLE
	        	query.append("INSERT INTO eof.RECIPE_RATING(recipe_id,user_id,rating)");
	            query.append(" VALUES(?,?,?);");
	            pstmt1 = con.prepareStatement(query.toString());
	            pstmt1.setInt(1, recipeBO.getRecipe_id());
	            pstmt1.setInt(2, recipeBO.getUserId());
	            pstmt1.setInt(3, recipeBO.getRating());
	            int r = pstmt1.executeUpdate();
	            if (r > 0) {
	            	recipeBO.setResult("true");
	            	statusLog.info("Rating added");
	            }else {
	            	recipeBO.setResult("Something went wrong!, Rating not added");
	            	statusLog.info("Rating not added");
	            }
            }
        }catch(Exception e) {
        	errorLog.error("Error Occur on insert the recipe Rating into the table");
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
		return recipeBO;
	}
	
	public void deleteComment(RecipeBO recipeBO) throws SQLException{

		Connection con = null;
        PreparedStatement pstmt = null;
        try {
        	con = new DBConnection().getConnection();
        	StringBuilder query = new StringBuilder();
        	// QUERY FOR DELETE THE COMMENT
            query.append("UPDATE EOF.RECIPE_CMD SET is_delete = 1 WHERE comment_id = ? ");
            pstmt = con.prepareStatement(query.toString());
            pstmt.setInt(1, recipeBO.getComment_id());
            int qryResult = pstmt.executeUpdate();
            if (qryResult > 0) {
            	recipeBO.setResult("true");
            	statusLog.info("Recipe comment deleted");
            }else {
            	recipeBO.setResult("Something went wrong!, Recipe comment not deleted");
            	statusLog.info("Recipe comment not deleted");
            }
        }catch(Exception e) {
        	errorLog.error("Error Occur on delete the recipe comment from the table");
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
