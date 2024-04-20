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

import com.eof.dao.RecipeDAO;
import com.eof.dao.UserDataDAO;

/**
 * Servlet implementation class GetDetails
 */
@WebServlet("/GetDetails")
public class GetDetails extends HttpServlet {
	private static final long serialVersionUID = 1L;
	static Logger errorLog = Logger.getLogger("errorLogger"); 
	static Logger statusLog = Logger.getLogger("statusLogger");
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetDetails() {
        super();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		JSONObject resobj = null;
		UserDataDAO userdataDAO = new UserDataDAO();
        RecipeDAO recipeDAO = new RecipeDAO();
        JSONArray arr = new JSONArray();
        String method = request.getParameter("method");
        try {
        	if(!method.equals(null)){
        		if(method.equals("getTopRecipes")) {
	        		arr = recipeDAO.getTopRecipes();
	        		response.getWriter().append(arr.toString());
	        		statusLog.info("Top 8 recipe Response sended to the front end");
	        	}else if(method.equals("usersList")) {
	        		arr = userdataDAO.getUsers();
	        		response.getWriter().append(arr.toString());
	        	}else if(method.equals("getcounts")) {
	        		resobj = userdataDAO.getCounts();
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
