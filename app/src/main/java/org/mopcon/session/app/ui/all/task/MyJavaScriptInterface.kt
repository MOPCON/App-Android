package org.mopcon.session.app.ui.all.task


class MyJavaScriptInterface {

    private var myJavaScriptInterfaceCallBack: MyJavaScriptInterfaceCallBack? = null
/*
    companion object {
        @JvmStatic
        fun newInstance(myJavaScriptInterfaceCallBack: MyJavaScriptInterfaceCallBack?) = MyJavaScriptInterface().apply {
            this.myJavaScriptInterfaceCallBack = myJavaScriptInterfaceCallBack
        }
    }
    */

    fun MyJavaScriptInterface(myJavaScriptInterfaceCallBack: MyJavaScriptInterfaceCallBack?) {
        this.myJavaScriptInterfaceCallBack = myJavaScriptInterfaceCallBack
    }


    interface MyJavaScriptInterfaceCallBack {
        fun clickedAdmission(code: String?, responseJSON: String?)
    }

//    @JavascriptInterface
//    fun applynow() {
//        myJavaScriptInterfaceCallBack!!.clickedAdmission()
//    }

}