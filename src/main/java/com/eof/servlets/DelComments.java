package com.eof.servlets;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.json.JSONObject;

import com.eof.bo.RecipeBO;
import com.eof.dao.RecipeDAO;

/**
 * Servlet implementation class DelComments
 */
@WebServlet("/DelComments")
public class DelComments extends HttpServlet {
	private static final long serialVersionUID = 1L;
	static Logger errorLog = Logger.getLogger("errorLogger"); 
	static Logger statusLog = Logger.getLogger("statusLogger");
    /**
     * @see HttpServlet#HttpServlet()
     */
    public DelComments() {
        super();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		JSONObject resobj = null;
		RecipeBO recipeBO = new RecipeBO();
        RecipeDAO recipeDAO = new RecipeDAO();
       	try{
       		resobj = new JSONObject();
    		recipeBO.setComment_id(Integer.valueOf(request.getParameter("comment_id")));
    		recipeDAO.deleteComment(recipeBO);
    		resobj.put("status", recipeBO.getResult());
    		response.getWriter().append(resobj.toString());
        	
    	}catch (Exception e) {
        	errorLog.error("Error Occur on Servlets");
            e.printStackTrace();
        }
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
