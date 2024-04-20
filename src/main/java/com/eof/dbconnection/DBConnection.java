package com.eof.dbconnection;

import java.sql.Connection;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;

import org.apache.log4j.Logger;

public class DBConnection {
	static Logger debugLog  = Logger.getLogger("debugLogger"); 
	static Logger errorLog = Logger.getLogger("errorLogger"); 
	
	private static DataSource ds = null;
	
	static {	
		try {
			Context initContext = new InitialContext();
			Context envContext  = (Context)initContext.lookup("java:/comp/env");
			ds = (DataSource)envContext.lookup("jdbc/datasource");
			System.out.println("Database config loaded in context.xml file");
			debugLog.info("data loaded from context file");
		} catch (Exception e) {
			e.printStackTrace();
			errorLog.error("Error Occur on Getting data source from the context file");
			System.out.println("Database config not loaded in context.xml file");
		}
		
	}
	
	
	public Connection getConnection(){
        Connection con = null;
        try{
        	con = ds.getConnection();
        	debugLog.info("Connection initialized");
        }catch(Exception e){
        	errorLog.error("Error Occur on Getting connection");
            e.printStackTrace();
        }
        return con;
    }
}
