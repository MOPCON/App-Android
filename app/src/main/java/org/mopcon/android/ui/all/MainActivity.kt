package org.mopcon.android.ui.all

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.widget.Toast
import androidx.navigation.Navigation
import androidx.navigation.ui.NavigationUI
import org.mopcon.android.ui.base.BaseBindingActivity
import org.mopcon.android.ui.extension.OnBackPressedListener
import com.google.android.gms.tasks.OnCompleteListener
import com.google.firebase.messaging.FirebaseMessaging
import org.mopcon.android.R
import org.mopcon.android.databinding.ActivityMainBinding


class MainActivity : BaseBindingActivity<ActivityMainBinding>() {

    override val bindingInflater: (LayoutInflater) -> ActivityMainBinding
        get() = ActivityMainBinding::inflate

    override fun initLayout() {
        val navController = Navigation.findNavController(this, R.id.mainContainer)
        NavigationUI.setupWithNavController(binding.bottomNavigation, navController)
    }

    override fun initAction() {
    }

    override fun initObserver() {
    }

    fun setTabToAgenda() {
        binding.bottomNavigation.selectedItemId = R.id.agendaFragment
    }

    fun setTabToNews() {
        binding.bottomNavigation.selectedItemId = R.id.newsFragment
    }

    override fun onBackPressed() {
        val fragment = this.supportFragmentManager.findFragmentById(R.id.mainContainer)?.childFragmentManager?.fragments?.get(0)
        (fragment as? OnBackPressedListener)?.onBackPressed()

        if (supportFragmentManager.backStackEntryCount >= 1) supportFragmentManager.popBackStack()
        else super.onBackPressed()

    }
}
