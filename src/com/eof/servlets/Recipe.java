package com.eof.servlets;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;

import com.eof.bo.RecipeBO;
import com.eof.dao.RecipeDAO;

/**
 * Servlet implementation class Recipe
 */
@WebServlet("/Recipe")
public class Recipe extends HttpServlet {
	private static final long serialVersionUID = 1L;
	static Logger errorLog = Logger.getLogger("errorLogger"); 
	static Logger statusLog = Logger.getLogger("statusLogger");
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Recipe() {
        super();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		JSONObject resobj = null;
		RecipeBO recipeBO = new RecipeBO();
        RecipeDAO recipeDAO = new RecipeDAO();
        JSONArray arr = new JSONArray();
        String method = request.getParameter("method");
        try {
        	if(!method.equals(null)){
        		if(method.equals("recipeDetails")){
	        		resobj = recipeDAO.getRecipeDetails(Integer.valueOf(request.getParameter("recipe_id")));
	        		response.getWriter().append(resobj.toString());
	        		
	        	}else if(method.equals("getComments")) {
	        		resobj = new JSONObject();
	        		arr = recipeDAO.getComments(Integer.valueOf(request.getParameter("recipe_id")));
	        		if(arr != null){
	        			resobj.put("status", "true");
	        			resobj.put("comments", arr);
	        			response.getWriter().append(resobj.toString());
	        		}else{
	        			resobj.put("status", "false");
	        			response.getWriter().append(resobj.toString());
	        		}
	        		
	        	}else if(method.equals("deleteRecipe")){
	        		resobj = new JSONObject();
	        		recipeBO.setRecipe_id(Integer.valueOf(request.getParameter("recipe_id")));
	        		recipeDAO.deleteRecipe(recipeBO);
	        		resobj.put("status", recipeBO.getResult());
		        	response.getWriter().append(resobj.toString());
	        		
	        	}
        	}else{
        		resobj = new JSONObject();
        		resobj.put("status", "Method value is NULL");
        		response.getWriter().append(resobj.toString());
        	}
        	
        } catch (Exception e) {
        	errorLog.error("Error Occur on Servlets");
            e.printStackTrace();
        }
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
