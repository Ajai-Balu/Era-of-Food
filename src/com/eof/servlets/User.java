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
import com.eof.bo.UserDataBO;
import com.eof.dao.RecipeDAO;
import com.eof.dao.UserDataDAO;

/**
 * Servlet implementation class User
 */
@WebServlet("/User")
public class User extends HttpServlet {
	private static final long serialVersionUID = 1L;
	static Logger errorLog = Logger.getLogger("errorLogger"); 
	static Logger statusLog = Logger.getLogger("statusLogger");
	
    /**
     * @see HttpServlet#HttpServlet()
     */
    public User() {
        super();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		JSONObject resobj = null;
		UserDataBO userBO = new UserDataBO();
		UserDataDAO userdataDAO = new UserDataDAO();
	    RecipeDAO recipeDAO = new RecipeDAO();
	    JSONArray arr = new JSONArray();
	    String method = request.getParameter("method");
	    try {
	    	if(!method.equals(null)){
	    		if(method.equals("getUserDetails")) {
	        		resobj = new JSONObject();
	        		userBO.setUser_id(Integer.valueOf(request.getParameter("user_id")));
	        		resobj = userdataDAO.getUserDetails(userBO);
	        		resobj.put("status", userBO.getResult());
	    			response.getWriter().append(resobj.toString());
	        	}else if(method.equals("myRecipes")){
	        		arr = recipeDAO.getMyRecipes(Integer.valueOf(request.getParameter("user_id")));
	        		response.getWriter().append(arr.toString());
	        		
	        	}else if(method.equals("deleteUser")){
	        		resobj = new JSONObject();
	        		userBO.setUser_id(Integer.valueOf(request.getParameter("user_id")));
	        		userdataDAO.deleteUser(userBO);
	        		resobj.put("status", userBO.getResult());
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
