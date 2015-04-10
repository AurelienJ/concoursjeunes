package org.ajdeveloppement.concours.webapi.helpers;

import java.beans.BeanInfo;
import java.beans.IntrospectionException;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

public class ModelViewMapper {

	public static <Model, ModelView> void mapModelToViewModel(Model model, ModelView modelView) throws IntrospectionException, IllegalAccessException, IllegalArgumentException, InvocationTargetException {
		if(modelView != null && model != null) {
			BeanInfo beanInfoModelView = Introspector.getBeanInfo(modelView.getClass());
			BeanInfo beanInfoModel = Introspector.getBeanInfo(model.getClass());
			
			List<PropertyDescriptor> propertyDescriptorsModel = Arrays.asList(beanInfoModel.getPropertyDescriptors());
			for (PropertyDescriptor pd : beanInfoModelView.getPropertyDescriptors()) {
				String propName = pd.getName();
				if(!propName.equals("class") && pd.getWriteMethod() != null) { //$NON-NLS-1$
					Method viewModelWriteMethod = pd.getWriteMethod();
					if(viewModelWriteMethod != null) {
						ModelViewBindedProperty bindedProperty = viewModelWriteMethod.getAnnotation(ModelViewBindedProperty.class);
						if(bindedProperty != null && !bindedProperty.value().isEmpty())
							propName = bindedProperty.value();
						
						String modelPropertyName = propName;
						
						Optional<PropertyDescriptor> modelPropertyDescriptor = propertyDescriptorsModel.stream().filter(pdm -> pdm.getName().equals(modelPropertyName)).findFirst();
						if(modelPropertyDescriptor.isPresent()) {
							
							//viewModelWriteMethod.
							Method modelReadMethod = modelPropertyDescriptor.get().getReadMethod();
							
							viewModelWriteMethod.invoke(modelView, modelReadMethod.invoke(model));
						}
					}
				}
			}
		}
	}
	
	public static <Model, ModelView> void mapModelViewToModel(ModelView modelView, Model model) throws IntrospectionException, IllegalAccessException, IllegalArgumentException, InvocationTargetException {
		if(modelView != null && model != null) {
			BeanInfo beanInfoModelView = Introspector.getBeanInfo(modelView.getClass());
			BeanInfo beanInfoModel = Introspector.getBeanInfo(model.getClass());
			
			List<PropertyDescriptor> propertyDescriptorsModel = Arrays.asList(beanInfoModel.getPropertyDescriptors());
			for (PropertyDescriptor pd : beanInfoModelView.getPropertyDescriptors()) {
				String propName = pd.getName();
				if(!propName.equals("class") && pd.getWriteMethod() != null) { //$NON-NLS-1$
					Method viewModelReadMethod = pd.getReadMethod();
					if(viewModelReadMethod != null) {
						ModelViewBindedProperty bindedProperty = viewModelReadMethod.getAnnotation(ModelViewBindedProperty.class);
						if(bindedProperty != null && !bindedProperty.value().isEmpty())
							propName = bindedProperty.value();
						
						String modelPropertyName = propName;
						
						Optional<PropertyDescriptor> modelPropertyDescriptor = propertyDescriptorsModel.stream().filter(pdm -> pdm.getName().equals(modelPropertyName)).findFirst();
						if(modelPropertyDescriptor.isPresent()) {
							Method modelWriteMethod = modelPropertyDescriptor.get().getWriteMethod();
							
							modelWriteMethod.invoke(model, viewModelReadMethod.invoke(modelView));
						}
					}
				}
			}
		}
	}

}
