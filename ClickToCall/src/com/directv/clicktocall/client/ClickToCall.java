package com.directv.clicktocall.client;

import com.directv.clicktocall.shared.FieldVerifier;
import com.google.gwt.core.client.EntryPoint;
import com.google.gwt.core.client.GWT;
import com.google.gwt.event.dom.client.ClickEvent;
import com.google.gwt.event.dom.client.ClickHandler;
import com.google.gwt.event.dom.client.KeyCodes;
import com.google.gwt.event.dom.client.KeyUpEvent;
import com.google.gwt.event.dom.client.KeyUpHandler;
import com.google.gwt.user.client.rpc.AsyncCallback;
import com.google.gwt.user.client.ui.Button;
import com.google.gwt.user.client.ui.DialogBox;
import com.google.gwt.user.client.ui.HTML;
import com.google.gwt.user.client.ui.Label;
import com.google.gwt.user.client.ui.RootPanel;
import com.google.gwt.user.client.ui.TextBox;
import com.google.gwt.user.client.ui.VerticalPanel;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.ListBox;
import com.google.gwt.user.client.ui.HorizontalSplitPanel;

/**
 * Entry point classes define <code>onModuleLoad()</code>.
 */
public class ClickToCall implements EntryPoint {
	/**
	 * The message displayed to the user when the server cannot be reached or
	 * returns an error.
	 */
	private static final String SERVER_ERROR = "An error occurred while "
			+ "attempting to contact the server. Please check your network " + "connection and try again.";

	private Label errorMsgLabel;

	/**
	 * This is the entry point method.
	 */
	public void onModuleLoad() {

		errorMsgLabel = new Label();
//	errorMsgLabel.setStyleName("gwt-Label-red");
		RootPanel.get("errorLabelContainer").add(errorMsgLabel);
		errorMsgLabel.setSize("430px", "20px");

		VerticalPanel verticalPanel = new VerticalPanel();
		RootPanel rootPanel = RootPanel.get("verticalPanel");
		rootPanel.add(verticalPanel);
		verticalPanel.setSize("430px", "259px");
		
		Label lblNewLabel = new Label("Talk with DirecTV customer service");
		lblNewLabel.setStyleName("hdg3");
		verticalPanel.add(lblNewLabel);
		
		VerticalPanel verticalPanel_1 = new VerticalPanel();
		verticalPanel.add(verticalPanel_1);
		verticalPanel_1.setSize("428px", "223px");
		
		Label lblHaveUsCall = new Label("Have us call you right now about:");
		verticalPanel_1.add(lblHaveUsCall);
		lblHaveUsCall.setSize("341px", "25px");
		
		VerticalPanel verticalPanel_2 = new VerticalPanel();
		verticalPanel_2.setStyleName("hdg3");
		verticalPanel_1.add(verticalPanel_2);
		
		Label lblIssueDetails = new Label("Issue Details:");
		verticalPanel_2.add(lblIssueDetails);
		
		VerticalPanel verticalPanel_3 = new VerticalPanel();
		verticalPanel_1.add(verticalPanel_3);
		
		HorizontalPanel horizontalPanel = new HorizontalPanel();
		verticalPanel_3.add(horizontalPanel);
		
		Label lblEnterYourNumber = new Label("Enter your number and click call me (You'll need an open phone line.)\nWe'll call you and connect you to a service specialist.");
		horizontalPanel.add(lblEnterYourNumber);
		
		HorizontalPanel horizontalPanel_1 = new HorizontalPanel();
		verticalPanel_3.add(horizontalPanel_1);
		Label lblCountry = new Label("Country");
		horizontalPanel_1.add(lblCountry);
		
		ListBox comboBox = new ListBox();
		comboBox.addItem("United States");
		comboBox.addItem("Mexico");
		comboBox.addItem("Brazil");
		horizontalPanel_1.add(comboBox);
		
		HorizontalPanel horizontalPanel_2 = new HorizontalPanel();
		verticalPanel_3.add(horizontalPanel_2);
		Label lblYourNumber = new Label("Your Number");
		horizontalPanel_2.add(lblYourNumber);
		
		Label label = new Label("(");
		horizontalPanel_2.add(label);
		
		TextBox textBox = new TextBox();
		horizontalPanel_2.add(textBox);
		textBox.setWidth("43px");
		
		Label label_1 = new Label(")");
		horizontalPanel_2.add(label_1);
		
		TextBox textBox_1 = new TextBox();
		horizontalPanel_2.add(textBox_1);
		textBox_1.setWidth("45px");
		
		Label label_2 = new Label("-");
		horizontalPanel_2.add(label_2);

		TextBox textBox_2 = new TextBox();
		horizontalPanel_2.add(textBox_2);
		textBox_2.setWidth("60px");

		TextBox textBox_3 = new TextBox();
		horizontalPanel_2.add(textBox_3);
		textBox_3.setWidth("60px");
		
		HorizontalPanel horizontalPanel_3 = new HorizontalPanel();
		verticalPanel_3.add(horizontalPanel_3);

		HorizontalPanel horizontalPanel4 = new HorizontalPanel();
		horizontalPanel_3.add(horizontalPanel4);

		HorizontalPanel horizontalPanel5 = new HorizontalPanel();
		horizontalPanel_3.add(horizontalPanel5);

		Button btnCallMe = new Button("Call Me");
		horizontalPanel5.add(btnCallMe);
		
		Button btnCallMe5Min = new Button("Call Me in 5 minutes");
		horizontalPanel5.add(btnCallMe5Min);
	}
}
