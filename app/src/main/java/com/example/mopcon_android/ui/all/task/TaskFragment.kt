package com.example.mopcon_android.ui.all.task

import android.view.LayoutInflater
import android.view.ViewGroup
import com.example.mopcon_android.databinding.FragmentMoreBinding
import com.example.mopcon_android.ui.base.BaseBindingFragment

class TaskFragment : BaseBindingFragment<FragmentMoreBinding>() {

    override val bindingInflater: (LayoutInflater, ViewGroup?, Boolean) -> FragmentMoreBinding
        get() = FragmentMoreBinding::inflate

    override fun initLayout() {
        TODO("Not yet implemented")
    }

    override fun initAction() {
        TODO("Not yet implemented")
    }

    override fun initObserver() {
        TODO("Not yet implemented")
    }

//    override fun onCreateView(
//        inflater: LayoutInflater, container: ViewGroup?,
//        savedInstanceState: Bundle?
//    ): View? {
//        // Inflate the layout for this fragment
////        return inflater.inflate(R.layout.fragment_more, container, false)
//        binding = FragmentMoreBinding.inflate(inflater)
//        return binding.root
//    }


}