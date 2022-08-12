package com.example.mopcon_android.ui.all.news

import android.view.LayoutInflater
import android.view.ViewGroup
import com.example.mopcon_android.databinding.FragmentMoreBinding
import com.example.mopcon_android.databinding.FragmentNewsBinding
import com.example.mopcon_android.ui.base.BaseBindingFragment

class NewsFragment : BaseBindingFragment<FragmentNewsBinding>() {

    override val bindingInflater: (LayoutInflater, ViewGroup?, Boolean) -> FragmentNewsBinding
        get() = FragmentNewsBinding::inflate

    override fun initLayout() {
    }

    override fun initAction() {
    }

    override fun initObserver() {
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